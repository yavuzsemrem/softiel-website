import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';

// EmailJS configuration (server-side)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_kz9k55y';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_zj8l9k7';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '2sFjyMYKIlcAHZn4r';

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

    // Initialize EmailJS (server-side)
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Send email via EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (result.status === 200) {
      // Log successful send (production'da proper logging service kullanın)
      console.log(`Quote form email sent successfully from ${templateParams.email}`);
      
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

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


