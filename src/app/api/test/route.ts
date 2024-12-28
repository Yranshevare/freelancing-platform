import bcrypt from "bcrypt";
import { NextRequest,NextResponse } from 'next/server'




export async function POST (req : NextRequest){
    const {password} =await req.json()

    const hashedPassword = await bcrypt.hash(password, 10)
    return NextResponse.json(
        { 
            hashedPassword: hashedPassword,
            message: "password hashed"
        },
        { 
            status: 200
        }
    );
    
}