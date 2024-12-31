import bcrypt from "bcrypt";
import { NextRequest,NextResponse } from 'next/server'
import { getDataFromToken } from "@/helper/getUserIdFromToken";
import upload from "@/helper/multer.js"
import {join} from "path"
import { writeFile } from "fs/promises";




export async function POST (req : NextRequest){
    console.log("into text api-3")
    try {
        const data = await req.formData();
        const file: File | null = data.get('file') as unknown as File
        console.log(file,"from test api")

        const byte = await file.arrayBuffer();
        const buffer = Buffer.from(byte)
        // console.log(buffer)

        // const path = join('@','/','public','/','temp',file.name)
        const path = `./public/temp/${file.name}`
        // // console.log(path)
        const upload = await writeFile(path,buffer)
        // console.log(upload)


        // upload.single(data)








        // const byteData = await file.arrayBuffer();

        // const data = req.json();
        // console.log(data)
            return NextResponse.json({
                message:"success",
                data:data
            })
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