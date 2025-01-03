import { NextResponse,NextRequest } from "next/server";
import Project from "@/models/project.model";
import { getDataFromToken } from "@/helper/getUserIdFromToken";

export async function POST(req: NextRequest) {
    /*
        find the project from project id
        check for authority by comparing owner id with userid from getDataFromToken
        update the project
    */
    try {
        const {projectId,title,description,skills,completionStatus,haringStatus} = await req.json()
    
        const userId = await getDataFromToken(req)
        if (!userId) {
            return NextResponse.json({
                message: "Unauthorized",
                status: 401
            });
        }
        const project = await Project.findById(projectId);

        if (!project) {
            return NextResponse.json({
              message: "Project not found",
              status: 404,
            });
          }
      
          // Check if the logged-in user is the owner of the project
        if (project.ownerId.toString() !== userId) {
          return NextResponse.json({
            message: "Not authorized to update this project",
            status: 403,
          });
        }

        project.title = title
        project.description = description
        project.skills = skills
        project.completionStatus = completionStatus
        project.hiringStatus = haringStatus
        
         // Save the updated project
        await project.save();

        // Return the updated project data
        return NextResponse.json({
          message: "Project updated successfully",
          data: project,
          status: 200,
        });
    } catch (error:any) {
        return NextResponse.json({
            message: "Invalid request",
            error: error.message,
            status: 400
        })
    }
}