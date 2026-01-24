import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (request.method === 'POST' && !request.nextUrl.pathname.startsWith('/api/')) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }


  const dnsEndpoints = ['/dns-query', '/query', '/resolve'];
  if (dnsEndpoints.some(endpoint => request.nextUrl.pathname.startsWith(endpoint))) {
    return new NextResponse(null, { status: 444 }); // Close connection
  }


  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    'NEO-X5-116A',        // старый Android из логов
    'AFTWMST22',          // Fire TV из логов
    'Go-http-client',     // DNS-over-HTTPS атака
    'python-requests',    // Боты
    'scanner',            // Сканеры уязвимостей
  ];

  if (suspiciousPatterns.some(pattern => userAgent.includes(pattern))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
