import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req:NextRequest) {
    try {
        await client.connect();
        const db=client.db('dealhunt');
        const collection=db.collection('Deal');
        const session=await auth();
        const favourites=await collection.find({userid:session?.user.id,status:'fav'}).toArray(); //we are retrieving all the deals under this loggedin userid but having status 'fav'.
        if(favourites.length===0){
            return NextResponse.json({success:false,data:null,message:'No favourite deals assigned'},{status:500})
        }
         return NextResponse.json({success:true,data:favourites,message:' favourite deals fetched successfully'},{status:200})

    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
            return NextResponse.json({success:false,data:null,message:error.message},{status:500})

        }
        
    }
    
}