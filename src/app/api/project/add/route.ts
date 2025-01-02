import { NextResponse,NextRequest } from "next/server";
import { connectDb } from "@/db/index";
import Project from '@/models/project.model.js'
import Profile from "@/models/profile.model";
import { getDataFromToken } from "@/helper/getUserIdFromToken";

connectDb()

export async function POST(req:NextRequest){
    try {
        let completion,haring
        const {title,description,skills,completionStatus,hiringState,image} = await req.json()

        const userId = await getDataFromToken(req)
        if(!userId){
            return NextResponse.json({
                message: "You are not authenticated",
                status: 401
            })
        }
        const userProfile = await Profile.findOne({ownerId: userId})
        if(!userProfile){
            return NextResponse.json({
                message: "Profile not found",
                status: 404
            })
        }

        if(completionStatus === 1){
            completion = 'pending'
        }
        if(completionStatus === 2){
            completion = 'ongoing'
        }
        if(completionStatus === 3){
            completion = 'completed'
        }

        if(hiringState === 1){
            haring = 'not_haring'
        }
        if(hiringState === 2){
            haring = 'haring'
        }
        console.log(title,description,skills,completion,haring,image  )
        //creating new project
        const newProject = new Project({
            title:title,
            description:description,
            ownerId:userId,
            skills:skills,
            completionStatus:completion,
            haringStatus:haring,
            image:image
        })
        // console.log(newProject,"new project")

        const saveProject = await newProject.save()
        // console.log(saveProject,"save project")


        userProfile.project = [...userProfile.project,saveProject._id]
        await userProfile.save()
        // console.log(userProfile)
        
        return NextResponse.json({
            message:"project added successfully",
            project:saveProject,
            status:201
        })
    } catch (error:any) {
        return NextResponse.json({
            message:"unable to add project",
            error:error.message,
            status:500
        })
    }
}  


