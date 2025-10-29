import { NextRequest, NextResponse } from 'next/server';

// EmailJS configuration (server-side)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_kz9k55y';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_zj8l9k7';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '2sFjyMYKIlcAHZn4r';
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// Rate limiting store (in-memory, production'da Redis kullanın)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function rateLimit(identifier: string, maxRequests: number = 2, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check EmailJS configuration
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      return NextResponse.json(
        { success: false, error: 'EmailJS configuration missing' },
        { status: 500 }
      );
    }

    const templateParams = await request.json();

    // Validate input
    if (!templateParams.name || !templateParams.email || !templateParams.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(templateParams.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Send email via EmailJS REST API
    const emailjsPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams
    };

    let emailjsResponse;
    let responseText;
    
    try {
      emailjsResponse = await fetch(EMAILJS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailjsPayload),
      });

      responseText = await emailjsResponse.text();
    } catch (fetchError: any) {
      console.error('EmailJS fetch error:', fetchError);
      return NextResponse.json(
        { success: false, error: `Network error: ${fetchError.message}` },
        { status: 500 }
      );
    }

    if (!emailjsResponse.ok) {
      console.error('EmailJS API error:', {
        status: emailjsResponse.status,
        statusText: emailjsResponse.statusText,
        response: responseText
      });
      
      let errorMessage = 'Failed to send email';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.text || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = responseText || emailjsResponse.statusText || errorMessage;
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }

    // Log successful send
    console.log(`Quote form email sent successfully from ${templateParams.email}`);
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error: any) {
    console.error('Quote form email send error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Cleanup rate limit store every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);


