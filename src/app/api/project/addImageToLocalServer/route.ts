import { writeFile } from "fs/promises";
import {uploadOnCloudinary} from "@/helper/cloudinary.js"
import { NextResponse,NextRequest } from "next/server";

export async function POST (req: NextRequest){
    try {
        const data = await req.formData();

    
        const file: File | null = data.get('file') as unknown as File   //formData.get('file'), this returns either a File object (if a file is selected with the name 'file') or null if no file is found.
        const byte = await file.arrayBuffer();      // It returns a Promise that resolves to an ArrayBuffer representing the contents of a file. An ArrayBuffer is a low-level, fixed-length binary data buffer used in JavaScript to represent raw data in the form of bytes.
        const buffer = Buffer.from(byte)    //you can convert it to a Buffer using Buffer.from().  Buffer is a built-in class in Node.js that allows you to work with binary data directly.
        // const path = join('@','/','public','/','temp',file.name)
        const path = `./public/temp/${file.name}`
        // console.log(buffer)
        await writeFile(path,buffer)

        const response = await uploadOnCloudinary(path) 

        console.log(response)
        
        return NextResponse.json({
            message:"success",
            data:response
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            message:'unable to upload file',
            status: 500
        })
    }
}