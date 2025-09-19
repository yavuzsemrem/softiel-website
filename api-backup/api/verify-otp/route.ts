import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otp';
import { monitoring } from '@/lib/monitoring';

export async function POST(request: NextRequest) {
  try {
    const { otpId, code, email } = await request.json();

    // Validate input
    if (!otpId || !code || !email) {
      return NextResponse.json(
        { success: false, error: 'otpId, code, and email are required' },
        { status: 400 }
      );
    }

    // Validate OTP code format
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP code format' },
        { status: 400 }
      );
    }

    // Verify OTP
    const result = await otpService.verifyOTP(otpId, code, email);

    if (!result.success) {
      // Log failed verification attempt
      monitoring.trackSecurityEvent('otp_verification_failed', {
        email,
        otpId,
        code: code.substring(0, 2) + '****' // Partial code for security
      }, 'medium');

      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // Log successful verification
    monitoring.trackSecurityEvent('otp_verification_success', {
      email,
      otpId
    }, 'low');

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error: any) {
    console.error('Error in verify-otp API:', error);
    
    // Log error
    monitoring.trackError(error, 'otp_verify_api_error');
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

