import { connect } from "@/dbConfig/dbConfig";
import User   from"@/models/userModel"
import bcryptjs from"bcryptjs"
import { errorMonitor } from "events";
import { mongo } from "mongoose";
import { NextRequest , NextResponse } from "next/server";

connect()

export async function POST(request : NextRequest){
    try{

        const reqBody = await request.json()
        const {email , username , password} = reqBody;
        console.log(reqBody);

        //  check user already exists 
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error : "User already exists "},{status:400})
        }

        
        // hashed password 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({

            username ,
            email,
            password : hashedPassword

        })
        // save to database 
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created Successfully  ",
            success : true ,
            savedUser
        })
    }catch(error  : any ){
      return NextResponse.json({error : error.message},
      {status:500})
        }
}