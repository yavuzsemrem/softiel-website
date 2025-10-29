import { NextRequest, NextResponse } from 'next/server'

const DASHBOARD_HOST = process.env.NEXT_PUBLIC_DASHBOARD_HOST || 'dashboard.softiel.com'
const DASHBOARD_BASE = process.env.NEXT_PUBLIC_DASHBOARD_BASE || '/content-management-system-2024'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // 1) Host bazlı yönlendirme: dashboard.softiel.com → kök istekleri CMS ana rotasına rewrite et
  if (host === DASHBOARD_HOST) {
    // Dashboard tüm yanıtları noindex yap
    if (pathname === '/' || pathname === '') {
      const target = new URL(DASHBOARD_BASE, request.url)
      const res = NextResponse.rewrite(target)
      res.headers.set('X-Robots-Tag', 'noindex, nofollow')
      return res
    }
    const res = NextResponse.next()
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  const response = NextResponse.next()
  
  // İletişim sayfası için bfcache optimizasyonu
  if (request.nextUrl.pathname.includes('/iletisim') || 
      request.nextUrl.pathname.includes('/contact') || 
      request.nextUrl.pathname.includes('/kontakt')) {
    // bfcache için gerekli başlıkları ayarla
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    
    // WebSocket kullanımını engellemek için CSP ayarla
    response.headers.set('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://api.emailjs.com; " +
      "frame-src 'none'; " +
      "object-src 'none'; " +
      "base-uri 'self';"
    )
  }
  
  // Statik dosyalar için cache başlıkları
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // HTML sayfaları için bfcache optimizasyonu
  if (pathname.endsWith('.html') || 
      (!pathname.includes('.') && !pathname.startsWith('/api'))) {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}


