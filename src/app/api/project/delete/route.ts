import { NextResponse,NextRequest } from "next/server";
import Project from "@/models/project.model";
import { getDataFromToken } from "@/helper/getUserIdFromToken";
import Profile from "@/models/profile.model";

export async function POST(req: NextRequest) {
    /*
        get projectId from frontend
        find the respective project form project model by using project id
        septate out the owner id
        get userId from getUserIdFromToken
        check if the userId is equal to the ownerId of the project
        find the profile from ownerId
        septate out the project array from profile
        filter the profile.project array for given projectId i.e remove the projectId from the profile.project array
        update the profile
        delete the project from Project model
    */

        try {
            const { projectId} = await req.json()
            // console.log(projectId)
            const project = await Project.findById(projectId)
            if (!project) {
                return NextResponse.json({
                    message: "Project not found",
                    status: 404
                })
            }
            console.log(project.ownerId.toString())
            const userId =await getDataFromToken(req)
            console.log(userId)
            if (project.ownerId.toString() !== userId) {
                return NextResponse.json({
                  message: "Unauthorized to delete this project",
                  status: 403,
                });
            }


            

            const profile = await Profile.findOne({ ownerId: userId })
            if (!profile) {
                return NextResponse.json({
                    message: "Profile not found",
                    status: 404
                })
            }

            profile.project = profile.project.filter((p:any) => p._id.toString()!== projectId)
            await profile.save()

            await Project.findByIdAndDelete(projectId)

            return NextResponse.json({
                message: "Project deleted successfully",
                status: 200
            })

        } catch (error:any) {
            return NextResponse.json({
                error: error.message,
                message: "An error occurred while deleting the project",
                status: 500
            })
        }
}