import {connectDb } from '../../../../db/index' 
import { NextRequest,NextResponse } from 'next/server'
import User from '../../../../models/user.model.js'


connectDb()

export async function POST (req : NextRequest){

   try {
     //getting the data from the frontend request body
     const { username, email, password } = await req.json()

    //  console.log(username, email, password)

     //checking if user already exists with email and username
     const userNameExist = await User.findOne({username:username})
     if(userNameExist){
         return NextResponse.json({
             error: "Username already exists",
             status:400
         })
     }
     const emailExist = await User.findOne({email})
     if(emailExist){
         return NextResponse.json({
             error: "email already exists",
             status:400
         })
     }
 
     //creating a new user
     const newUser = new User({
        username, 
        email, 
        password
    })

    // console.log(newUser)
 
     //saving the user
     const savedUSer = await newUser.save()
    //  console.log(savedUSer)
 
     //returning the saved user with success status
     return NextResponse.json({
         message: "User created successfully",
         user: savedUSer,//TODO: check if we need it or not
         status: 200
     })
   } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            message: "Error while creating user",
            status: 500
 
        })
   }
    
}