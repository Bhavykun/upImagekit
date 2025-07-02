import { authOptions } from "@/lib/auth";
import { ConnectTODB } from "@/lib/db";
import Video, { VideoInt } from "@/models/Video"; // Adjust the import path to your actual Mongoose Video model
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await ConnectTODB()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

        if(!videos || videos.length === 0){
            return NextResponse.json([],{status:200})
        }

        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({error:"Failed to fetch videos"},{status:500});
    }
}

export async function POST(request:NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }

        await ConnectTODB();

        const body:VideoInt = await request.json();

        if(!body.title || !body.description || !body.videoURL || !body.thumbnailURL){
            return NextResponse.json({error:"Missing fields required"},{status:400});
        }

        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation : {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }
        const newVideo = await Video.create(videoData);
        return NextResponse.json(newVideo);

    } catch (error) {
        return NextResponse.json({error:"Failed to create Video"},{status:500});
    }
}