import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/auth";

interface paramType{
    params:{
        tagname:string;
    }
}

export async function GET(req:NextRequest,{params}:paramType) {
    await client.connect();
    const session=await auth();
    const db=client.db('dealhunt');
    const collection=db.collection('Deal');
    const {tagname}= params;
    try {
        const data=await collection.find({userid:session?.user.id,tag:tagname.toLowerCase()}).toArray();  //
        return NextResponse.json({success:true,data,message:'Deals under this data fetched successfully'},{status:200})
    } catch (error:unknown) {

        if(error instanceof Error){
            console.log(error.message)
              return NextResponse.json({success:false,data:null,message:error.message},{status:500})

        }
        
    }

    
}