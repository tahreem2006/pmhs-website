import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routerAccessMap } from './lib/setting'
import { NextResponse } from 'next/server'
 

// const isProtectedRoute = createRouteMatcher(['/admin', '/teacher'])

const matchers= Object.keys(routerAccessMap).map(route=>({
    matcher:createRouteMatcher([route]),
    allowedRoles:routerAccessMap[route],

}))

console.log(matchers)
export default clerkMiddleware(async (auth, req) => {

    // 2. Added 'await' to resolve the auth data payload
    const { sessionClaims } = await auth();//auth() is an asychoronous funtion so we ,ust use it with await
    
   const role=(sessionClaims?.metadata as {role?:string })?.role;

   for(const {matcher,allowedRoles} of matchers)
   {
     if(matcher(req) && !allowedRoles.includes(role!))
     {
        return NextResponse.redirect(new URL(`${role}`,req.url));
     }
   }

  })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};