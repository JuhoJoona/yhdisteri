import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

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

export default clerkMiddleware(async (auth, req) => {
  // Next-intl middleware logic
  const intlMiddleware = createMiddleware(routing);
  const intlResponse = intlMiddleware(req);

  // Clerk authentication logic
  if (isPublicRoute(req)) return intlResponse;

  // Restrict admin routes to users with specific permissions
  if (isTenantAdminRoute(req)) {
    await auth.protect((has) => {
      return (
        has({ permission: 'org:admin:example1' }) ||
        has({ permission: 'org:admin:example2' })
      );
    });
  }

  // Restrict organization routes to signed in users
  if (isTenantRoute(req)) await auth.protect();
  if (isProtectedRoute(req)) await auth.protect();

  return intlResponse;
});

export const config = {
  matcher: [
    // Include routes for both internationalization and Clerk
    '/',
    '/(de|en)/:path*',
    // Clerk matcher routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
