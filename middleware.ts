import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const createRouteMatcher = (patterns: string[]) => {
  return (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    return patterns.some((pattern) => {
      if (pattern.endsWith('(.*)')) {
        const base = pattern.slice(0, -4);
        return pathname === base || pathname.startsWith(`${base}/`);
      }
      return pathname === pattern;
    });
  };
};

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
  '/lander(.*)',
  '/admin(.*)',
]);

const isTenantRoute = createRouteMatcher([
  '/organization-selector(.*)',
  '/orgid/(.*)',
]);

const isTenantAdminRoute = createRouteMatcher([
  '/orgId/(.*)/memberships',
  '/orgId/(.*)/domain',
]);

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export async function middleware(req: NextRequest) {
  // Next-intl middleware logic
  const intlMiddleware = createIntlMiddleware(routing);
  const intlResponse = intlMiddleware(req);

  // Create a Supabase client for auth
  const supabase = createMiddlewareClient({ req, res: intlResponse });

  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Public routes are accessible without authentication
  if (isPublicRoute(req)) return intlResponse;

  // For protected routes, redirect to sign-in if not authenticated
  if ((isProtectedRoute(req) || isTenantRoute(req)) && !session) {
    const redirectUrl = new URL('/sign-in', req.nextUrl.origin);
    redirectUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // For tenant admin routes, check if user has admin role
  if (isTenantAdminRoute(req)) {
    if (!session) {
      const redirectUrl = new URL('/sign-in', req.nextUrl.origin);
      redirectUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if user has admin role (you'll need to implement this logic)
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id);

    const isAdmin = userRoles?.some(
      (role) =>
        role.role === 'org:admin:example1' || role.role === 'org:admin:example2'
    );

    if (!isAdmin) {
      // Redirect to unauthorized page or dashboard
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Include routes for internationalization
    '/',
    '/(en|fi|sv)/:path*',
    // Protected routes
    '/dashboard/:path*',
    '/forum/:path*',
    '/lander/:path*',
    '/admin/:path*',
    '/organization-selector/:path*',
    '/orgid/:path*',
    // Auth routes
    '/sign-in/:path*',
    '/sign-up/:path*',
  ],
};
