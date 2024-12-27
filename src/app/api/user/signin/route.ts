import {connectDb } from '../../../../db/index' 
import { NextRequest,NextResponse } from 'next/server'
import User from '../../../../models/user.model.js'
// import bcrypt from 'bcrypt'
import bcrypt from "bcrypt";

// import bcryptjs from 'bcryptjs'


connectDb()

export async function POST (req : NextRequest){

   try {
     //getting the data from the frontend request body
     const { username, email, password } = await req.json()

    //  console.log(username, email, password)

     //checking if user already exists with email and username
     const user = await User.findOne({$or: [{username}, {email}]})
     if(user){
         return NextResponse.json({
             error: "User already exists",
             status:400
         })
     }

    //  //hashing the password
    //  const salt = await bcryptjs.genSalt(10)
    //  const hashedPassword = await bcryptjs.hash(password, salt)
    
     //hashing the password using bcrypt
     const hashedPassword = await bcrypt.hash(password, 10)
 
     //creating a new user
     const newUser = new User({
        username, 
        email, 
        password:hashedPassword
    })

    console.log(newUser)
 
     //saving the user
     const savedUSer = await newUser.save()
     console.log(savedUSer)
 
     //returning the saved user with success status
     return NextResponse.json({
         message: "User created successfully",
         user: savedUSer,
         status: 201
     })
   } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            message: "Error while creating user",
            status: 500
 
        })
   }
    
}