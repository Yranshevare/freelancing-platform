import { NextRequest,NextResponse } from 'next/server'
import { writeFile } from "fs/promises";
import Profile  from "@/models/profile.model.js"
import { connectDb } from '@/db/index';
import {getDataFromToken} from '@/helper/getUserIdFromToken'
import {uploadOnCloudinary} from "@/helper/cloudinary.js"
import {deleteCloudinaryImage} from '@/helper/deleteImgOnCloudinary';

connectDb()




export async function POST (req : NextRequest){
    // console.log("from save image")
    try {
        const userId = await getDataFromToken(req)
        if(!userId){
            return NextResponse.json({
                message: "You are not authenticated",
                status: 401
            })
        }
        const profile = await Profile.findOne({ownerId:userId})
        if(!profile){
            return NextResponse.json({
                message: "Profile not found",
                status: 404
            })
        }

        
        const data = await req.formData();      //FormData object should be created before using it, which allows you to collect and submit form data, especially file uploads.

        const file: File | null = data.get('file') as unknown as File   //formData.get('file'), this returns either a File object (if a file is selected with the name 'file') or null if no file is found.

        const byte = await file.arrayBuffer();      // It returns a Promise that resolves to an ArrayBuffer representing the contents of a file. An ArrayBuffer is a low-level, fixed-length binary data buffer used in JavaScript to represent raw data in the form of bytes.
        const buffer = Buffer.from(byte)    //you can convert it to a Buffer using Buffer.from().  Buffer is a built-in class in Node.js that allows you to work with binary data directly.

        // const path = join('@','/','public','/','temp',file.name)
        const path = `./public/temp/${file.name}`
        // console.log(buffer)
        await writeFile(path,buffer)
        // console.log(upload)

        if(profile.image){
             try {
                await deleteCloudinaryImage(profile.image);
            } catch (error) {
                
                return NextResponse.json({
                    message:'unable to delete the image'
                })
            }
        }
        const response = await uploadOnCloudinary(path) 

        if(!response){
            return NextResponse.json({
                message: "Error while uploading to cloudinary",
                status: 500
            })
            
        }

        profile.image = response.url

        
        await profile.save()

        return NextResponse.json({
            message:"file successfully uploaded to local storage",
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