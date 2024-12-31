import {v2 as cloudinary} from "cloudinary"
import { NextResponse } from "next/server"
export async function deleteCloudinaryImage(imageUrl:any){
    try {
        // Extract the public ID from the image URL
        const urlArray = imageUrl.split('/')
        const imageName = urlArray[urlArray.length - 1]
        const image = imageName.split('.')[0]

        // Call Cloudinary's destroy method with the public ID
        const response = await cloudinary.uploader.destroy(image)

        // Check if the deletion was successful
        if (response.result !== 'ok') {
            return NextResponse.json(
              {
                message: "Failed to delete image from Cloudinary",
                status: 500,
              },
              { status: 500 }
            );
        }
        
         // Return success response
        return NextResponse.json({
            message: "Image deleted successfully from cloudinary",
            status: 200
        })
    } catch (error:any) {
        return(
            NextResponse.json({
                error: error.message,
                message: "Error while deleting image from cloudinary",
                status: 500
            })
        )
    }

}