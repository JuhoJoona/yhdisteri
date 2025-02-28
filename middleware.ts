import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

const isTenantRoute = createRouteMatcher([
  "/organization-selector(.*)",
  "/orgid/(.*)",
]);

const isTenantAdminRoute = createRouteMatcher([
  "/orgId/(.*)/memberships",
  "/orgId/(.*)/domain",
]);

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;
  // Restrict admin routes to users with specific permissions
  if (isTenantAdminRoute(req)) {
    await auth.protect((has) => {
      return (
        has({ permission: "org:admin:example1" }) ||
        has({ permission: "org:admin:example2" })
      );
    });
  }
  // Restrict organization routes to signed in users
  if (isTenantRoute(req)) await auth.protect();
  if (isProtectedRoute(req)) await auth.protect();
  
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
