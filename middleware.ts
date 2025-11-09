import { NextRequest, NextResponse } from 'next/server'

const DASHBOARD_HOST = process.env.NEXT_PUBLIC_DASHBOARD_HOST || 'dashboard.softiel.com'

export function middleware(request: NextRequest) {
  const rawHost = request.headers.get('host') || ''
  const host = rawHost.split(':')[0].toLowerCase()
  const dashboardHost = (DASHBOARD_HOST || '').toLowerCase()
  const pathname = request.nextUrl.pathname

  // 1) Host bazlı yönlendirme: dashboard.softiel.com için temiz URL'ler
  if (host === dashboardHost) {
    // Ana sayfa → Login'e redirect
    const isRoot = pathname === '/' || pathname === ''
    const isLocaleRoot = /^\/(tr|en|de|fr|ru|ar)\/?$/.test(pathname)
    if (isRoot || isLocaleRoot) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Temiz URL'leri gerçek path'lere rewrite et
    if (pathname === '/login') {
      return NextResponse.rewrite(new URL('/admin-panel-secure-access-2024', request.url))
    }
    
    if (pathname.startsWith('/dashboard')) {
      const newPath = pathname.replace('/dashboard', '/content-management-system-2024')
      return NextResponse.rewrite(new URL(newPath, request.url))
    }
    
    // Dashboard tüm yanıtları noindex yap
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


