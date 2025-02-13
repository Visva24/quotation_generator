import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

  const accessToken = req.cookies.get('access_token')?.value;

  const protectedRoutes = ['/quotation', '/challan', '/invoice', '/quotation/history', '/challan/history','/invoice/history','/profile',"/home",'/home/history'];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!accessToken) {
      console.log(' No access token found! Redirecting to log-in.');
      return NextResponse.redirect(new URL('/log-in', req.url));
    } else {
      console.log('Access token found! Allowing access.');
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/quotation/:path*', '/challan/:path*', '/invoice/:path*','/home/:path*','/profile'],
};
