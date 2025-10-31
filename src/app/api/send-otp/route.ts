import { NextRequest, NextResponse } from 'next/server'
import { generateOTP } from '@/lib/otp-service'

export async function POST(request: NextRequest) {
  try {
    // Body güvenli parse
    let email = ''
    try {
      const body = await request.json()
      email = (body?.email || '').toString().trim()
    } catch (_) {
      // JSON yoksa ya da hatalıysa email boş kalır
    }

    // Email zorunlu
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'E-posta adresi gerekli' },
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

    const result = await generateOTP(email)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'OTP kodu oluşturuldu',
        otpCode: result.otpCode, // Client-side EmailJS ile gönderilmek için
        userName: result.userName, // EmailJS template parametreleri için
        expiresIn: result.expiresIn
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Send OTP API error:', error)
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}