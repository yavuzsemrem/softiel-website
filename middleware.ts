import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // İletişim sayfası için bfcache optimizasyonu
  if (request.nextUrl.pathname.includes('/iletisim') || request.nextUrl.pathname.includes('/contact')) {
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
  if (request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // HTML sayfaları için bfcache optimizasyonu
  if (request.nextUrl.pathname.endsWith('.html') || 
      (!request.nextUrl.pathname.includes('.') && !request.nextUrl.pathname.startsWith('/api'))) {
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


