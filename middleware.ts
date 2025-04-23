import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabaseMiddleware';

export async function middleware(request: NextRequest) {
  //Check locale and redirect to /fi if not found
  const { pathname, search } = request.nextUrl;
  const locale = pathname.split('/')[1];
  if (!locale || !['en', 'fi'].includes(locale)) {
    return NextResponse.redirect(
      new URL(`/fi${pathname}${search}`, request.url)
    );
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
