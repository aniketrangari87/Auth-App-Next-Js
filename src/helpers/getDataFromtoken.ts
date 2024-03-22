import jwt  from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getDataFromtoken=(request: NextRequest)=>{

    try{
   const token = request.cookies.get('token')?.value || '';
   const encodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);

   return encodedToken.id;


    }catch(error:any){
        throw new Error(error.message)

    }

}