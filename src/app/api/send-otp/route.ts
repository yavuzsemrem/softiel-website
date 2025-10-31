import { NextRequest, NextResponse } from 'next/server'
import { generateOTP } from '@/lib/otp-service'

export async function POST(request: NextRequest) {
  try {
    // Referer kontrolü: Sadece dashboard (CMS) sayfasından gelen istekleri işleyelim
    const referer = request.headers.get('referer') || ''
    const host = request.headers.get('host') || ''
    const allowedHost = process.env.NEXT_PUBLIC_DASHBOARD_HOST || 'dashboard.softiel.com'
    const allowedBase = process.env.NEXT_PUBLIC_DASHBOARD_BASE || '/content-management-system-2024'

    const isAllowedReferer = referer.includes(allowedHost) || referer.includes(allowedBase)

    // Body güvenli parse
    let email = ''
    try {
      const body = await request.json()
      email = (body?.email || '').toString().trim()
    } catch (_) {
      // JSON yoksa ya da hatalıysa email boş kalır
    }

    // Eğer referer CMS değilse veya email yoksa; gürültü yaratmadan sessizce bitir (204)
    if (!isAllowedReferer || !email) {
      return new NextResponse(null, { status: 204 })
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
        message: 'OTP kodu gönderildi',
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