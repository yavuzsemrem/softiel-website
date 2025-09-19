import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, userName, otpCode, otpId } = await request.json();

    console.log('API Route called with:', { email, userName, otpCode, otpId });

    // Validate input
    if (!email || !userName || !otpCode || !otpId) {
      return NextResponse.json(
        { success: false, error: 'Email, userName, otpCode, and otpId are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Sending OTP email to:', email);

    // For now, just return success without actually sending email
    // This will help us test if the API route is working
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully (test mode)',
      otpCode: otpCode // Return the OTP for testing
    });

  } catch (error: any) {
    console.error('Error in send-otp API:', error);
    
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

