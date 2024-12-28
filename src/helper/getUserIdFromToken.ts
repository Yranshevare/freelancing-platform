import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request:NextRequest) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || ''  //gating the token if it is not there set the '' ( empty string ) 
        const decodedToken:any = jwt.verify(encodedToken,process.env.REFRESH_TOKEN_SECRETE!)
        // console.log(decodedToken._id,"token")
        return decodedToken._id
    } catch (error:any) {
        console.log("cannot find token")
        console.log(error.message)
    }
}