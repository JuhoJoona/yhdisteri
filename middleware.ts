import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabaseMiddleware';

export async function middleware(request: NextRequest) {
  //Check locale and redirect to /en if not found
  const { pathname } = request.nextUrl;
  const locale = pathname.split('/')[1];
  if (!locale || !['en', 'fi'].includes(locale)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
