import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname       //.nextUrl.pathname will give you on which path you are on
    const isPublicPth = path ==='/login' || path === '/signin'
    const token = request.cookies.get('token')?.value || ''     //gating the token if it is not there set the '' ( empty string ) 
    if(isPublicPth && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }

    if(!isPublicPth && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signin',
  ],
}