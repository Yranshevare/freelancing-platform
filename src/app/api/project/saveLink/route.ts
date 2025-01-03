import { NextResponse,NextRequest } from "next/server";
import Project from "@/models/project.model";


export async function POST (req: Request){
    try {
        const {projectId,link} = await req.json() 
        const project = await Project.findByIdAndUpdate(
            projectId,
            {
                $set:{
                    link: link
                }
            },
            {
                new:true
            } 

        ) 

        return NextResponse.json({
            message: "Project link added successfully",
            status: 200,
            project: project

        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to update project",
            status: 500
        })
    }
}