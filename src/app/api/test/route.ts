import bcrypt from "bcrypt";
import { NextRequest,NextResponse } from 'next/server'
import { getDataFromToken } from "@/helper/getUserIdFromToken";




export async function GET (req : NextRequest){
    try {
        const token = getDataFromToken(req)
        console.log(token,"token an api request")
        return NextResponse.json({
            user: token,
            message:'token found'
        }
        );
    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
                message: "Error while validating token",
                status: 500
            }
        );
    }
    
}