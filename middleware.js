import { NextResponse } from 'next/server';
import { COOKIE, verifySession } from './lib/auth/session';
// First gate. Every API route is guarded again by route() in lib/http.js.
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();
  if (await verifySession(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  if (pathname.startsWith('/api')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.redirect(new URL('/admin/login', req.url));
}
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
