import {connectDb } from '../../../../db/index' 
import { NextRequest,NextResponse } from 'next/server'
import User from '../../../../models/user.model.js'


connectDb()

export async function POST (req : NextRequest){
    // console.log("inside login request")
    try {
        const {id,password} = await req.json()
        // console.log(id,password)

        const user = await User.findOne({$or:[{username:id},{email:id}]})
        if(!user){
            return NextResponse.json({
                message: "user not found",
                status: 404
                
            })
            
        }
        // console.log(user)

        const isPasswordValid = await user.isPasswordCorrect(password)

        console.log(isPasswordValid)
        if(!isPasswordValid){
            return NextResponse.json({
                user: user,
                message: "Invalid password",
                status: 401
                
            })
            
        }

        const token = await user.generateRefreshToken()
        // console.log(token)

        if(!token){
            return NextResponse.json({
                message: "Failed to generate refresh token",
                status: 501
                
            })
        }

        const response = NextResponse.json({
            message:"login successful",

        },{status: 200})

        response.cookies.set("token", token)

        return response
        


    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            message: "Error while login the user",
            status: 500
        })
    }
}