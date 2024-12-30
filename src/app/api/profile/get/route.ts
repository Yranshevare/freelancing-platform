import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getUserIdFromToken";
import Profile from "@/models/profile.model";
import { ObjectId } from "mongodb";
import { connectDb } from "@/db";

connectDb()


export async function GET (req:NextRequest){
    // console.log("inside the test api")

    try {
        const userId = getDataFromToken(req)
    
        if(!userId){
            return NextResponse.json({
                message: "You are not authenticated"
            })
        }
    
        const profile = await Profile.findOne({ownerId: userId})
        if(!profile){
            return NextResponse.json({
                message: "Profile not found",
                status: 404
            })
        }
        
        const userProfile = await Profile.aggregate([
            {
                $match: {
                    // ownerId: new ObjectId('676edb64b1226ca1985d8bd1')
                    ownerId: new ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'ownerId',
                    foreignField: '_id',
                    as: 'profileUser'
                }
            },
            {
                $project: {
                    'profileUser.password': 0 ,
                    'profileUser.updatedAt': 0 ,
                    'profileUser.createdAt': 0 ,
                    'profileUser.__v': 0 ,
                }
            }
        ])
        // console.log(userProfile)
    
        return NextResponse.json({
            message: "profile found successfully",
            profile: userProfile[0]
        })
    } catch (error:any) {
        return NextResponse.json({
            message: "An error occurred while getting the users profile",
            error: error.message,
            
        },{status:500})
    }
 
}