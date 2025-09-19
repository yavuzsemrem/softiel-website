import { NextRequest, NextResponse } from 'next/server'
import { verifyOTP } from '@/lib/otp-service'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: 'E-posta adresi ve OTP kodu gerekli' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir e-posta adresi girin' },
        { status: 400 }
      )
    }

    // Validate OTP code format (6 digits)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { success: false, error: 'OTP kodu 6 haneli olmalıdır' },
        { status: 400 }
      )
    }

    const result = await verifyOTP(email, code)

    if (result.success && result.isValid) {
      return NextResponse.json({
        success: true,
        message: 'OTP kodu doğrulandı',
        isValid: true
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error, isValid: false },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Verify OTP API error:', error)
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}