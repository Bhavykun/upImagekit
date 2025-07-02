import { NextRequest,NextResponse } from "next/server";
import { ConnectTODB } from "@/lib/db";
import User from "@/models/User";

export async function POST(reques: NextRequest){
    try{
        const {email,password} = await reques.json();
        if(!email || !password){
            return NextResponse.json(
                {error:"Email and password are required"},
                {status: 400}
            );
        }
        await ConnectTODB();
        const existingUser = await  User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {error:"User already existing"},
                {status: 400}
            );
        }
        await User.create({
            email,
            password
        })
        return NextResponse.json(
                {error:"User registered successfully"},
                {status: 200}
        );
    }catch(error){
        console.error("Registration error",error);
        return NextResponse.json(
                {error:"Failed to register user"},
                {status: 400}
            );
    }
}

