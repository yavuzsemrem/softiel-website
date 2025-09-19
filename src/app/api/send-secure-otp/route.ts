import { NextRequest, NextResponse } from 'next/server';

// EmailJS configuration (server-side)
const EMAILJS_SERVICE_ID = 'service_oq1nmw9';
const EMAILJS_TEMPLATE_ID = 'template_2lo3mlh';
const EMAILJS_PUBLIC_KEY = 'qpbgVcHgvljqXJv7x';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otpCode, userName } = await request.json();

    // Create a simulated SMS message
    const smsMessage = `🔐 Softiel OTP Kodu: ${otpCode}\n\nMerhaba ${userName}!\n\nHesabınıza giriş yapmak için yukarıdaki 6 haneli kodu kullanın.\n\nBu kod 5 dakika geçerlidir.\n\nSoftiel - Dijital Çözümler`;
    
    // Send via EmailJS (server-side)
    const templateParams = {
      to_email: 'info@softiel.com',
      to_name: 'Admin',
      otp_code: otpCode,
      user_name: userName,
      phone_number: phoneNumber,
      message: smsMessage
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams
      })
    });

    if (!response.ok) {
      throw new Error(`EmailJS API Error: ${response.status}`);
    }

    const result = await response.text();

    return NextResponse.json({
      success: true,
      messageId: result
    });

  } catch (error: any) {
    console.error('Secure OTP send error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to send OTP'
    }, { status: 500 });
  }
}


