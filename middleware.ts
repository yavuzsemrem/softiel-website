import { NextRequest, NextResponse } from 'next/server'

const DASHBOARD_HOST = process.env.NEXT_PUBLIC_DASHBOARD_HOST || 'dashboard.softiel.com'
const DASHBOARD_BASE = process.env.NEXT_PUBLIC_DASHBOARD_BASE || '/content-management-system-2024'
const DASHBOARD_LOGIN = process.env.NEXT_PUBLIC_DASHBOARD_LOGIN || '/admin-panel-secure-access-2024'

export function middleware(request: NextRequest) {
  const rawHost = request.headers.get('host') || ''
  const host = rawHost.split(':')[0].toLowerCase()
  const dashboardHost = (DASHBOARD_HOST || '').toLowerCase()
  const pathname = request.nextUrl.pathname

  // 1) Host bazlı yönlendirme: dashboard.softiel.com → kök istekleri LOGIN sayfasına rewrite et
  if (host === dashboardHost) {
    // Dashboard tüm yanıtları noindex yap
    const isRoot = pathname === '/' || pathname === ''
    const isLocaleRoot = /^\/(tr|en|de|fr|ru|ar)\/?$/.test(pathname)
    if (isRoot || isLocaleRoot) {
      const target = new URL(DASHBOARD_LOGIN, request.url)
      const res = NextResponse.rewrite(target)
      res.headers.set('X-Robots-Tag', 'noindex, nofollow')
      return res
    }
    // Eğer yanlışlıkla locale köke yönlendirilmişse (örn /tr), yine login'e gönder
    if (/^\/(tr|en|de|fr|ru|ar)\/.+/.test(pathname) === false && pathname === '/tr') {
      const target = new URL(DASHBOARD_LOGIN, request.url)
      const res = NextResponse.rewrite(target)
      res.headers.set('X-Robots-Tag', 'noindex, nofollow')
      return res
    }
    const res = NextResponse.next()
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  // 2) Ana site: kök istekleri /en'e yönlendir (default açılış sayfası)
  if (pathname === '/' || pathname === '') {
    const url = new URL('/en', request.url)
    return NextResponse.redirect(url)
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
      "connect-src 'self' https://api.emailjs.com https://www.google.com https://www.gstatic.com; " +
      "frame-src https://www.google.com https://www.gstatic.com; " +
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


