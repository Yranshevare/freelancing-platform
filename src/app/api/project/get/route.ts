import { connectDb } from "@/db/index"
import { NextResponse,NextRequest } from "next/server"
import Project from "@/models/project.model"


connectDb()

export async function POST(req:NextRequest){
    try {
        const {projectId} = await req.json()

        //find the project
        const project = await Project.findById(projectId)
        if(!project){
            return NextResponse.json({
                message: "Project not found",
                status: 404
            })
        }

        return NextResponse.json({
            message: "success",
            project,
            status: 200
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            message: 'Failed to get project',
            status: 500
        })
    }
}