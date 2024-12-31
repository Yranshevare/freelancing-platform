import { NextRequest,NextResponse } from 'next/server'




export async function GET (req : NextRequest){
    try {
        const response = NextResponse.json({
            message: "Logged out successfully"
        })
        const option = {
            httpOnly: true, // Cookie cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production (HTTPS)
            sameSite: 'strict' as 'strict', // Ensuring this is a valid value
            // Add the path and domain if necessary (same as used when setting the cookie)
        }
          response.cookies.set('token', '', {...option,expires: new Date(0)})  
        return response
    } catch (error:any) {
        return NextResponse.json({
            message: "Failed to logout user",
            error:error
        })
    }
}