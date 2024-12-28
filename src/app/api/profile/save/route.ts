import { connectDb } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import Profile from "@/models/profile.model.js"
import {getDataFromToken} from "@/helper/getUserIdFromToken"


connectDb()

export async function POST(req:NextRequest){
    // console.log("inside the sava profile api")

    try {
        const { name,bio,linkOne,linkTwo } = await req.json()
        
        //getting the userid from the cookie
        const userId = await getDataFromToken(req)
        if(!userId){
            return NextResponse.json({
                message: "Unauthorized",
                status: 401
            })
        }

        const profile = await Profile.findOne({ownerId: userId})
        if(profile){
            //override the current profile
            profile.name = name
            profile.bio = bio
            profile.links = [
                linkOne || null,
                linkTwo || null
            ].filter(link => link!== null) // Remove null values

            await profile.save()
            return NextResponse.json({
                message: "Profile updated successfully",
                status: 200,
                profile
            })
        }else{

            // console.log(name, bio, linkOne, linkTwo)
            // linkOne ? console.log("linkOne") : console.log("link not present")
            //create new profile
            const newProfile = new Profile({
                ownerId:userId,
                name:name,
                bio:bio,
                links: [
                    linkOne || null,
                    linkTwo || null
                ].filter(link => link !== null) // Remove null values
            })
        
            // console.log(newProfile)

            const savedProfile = await newProfile.save()
        
            return NextResponse.json({
                message: "Profile saved successfully",
                status: 200,
                profile: savedProfile

            })
        }


        // console.log(name, bio, linkOne, linkTwo)
        // linkOne ? console.log("linkOne") : console.log("link not present")
        //create new profile
        const newProfile = new Profile({
            ownerId:userId,
            name:name,
            bio:bio,
            links: [
                linkOne || null,
                linkTwo || null
            ].filter(link => link !== null) // Remove null values
        })

        console.log(newProfile)

        return NextResponse.json({
            message: "Profile saved successfully"
        })

    } catch (error) {
        
    }






   

}