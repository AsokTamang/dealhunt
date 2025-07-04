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
    const {tagname}=await params;
    try {
        const data=await collection.find({userid:session?.user.id,tag:tagname}).toArray();  //
        if(data.length===0){
             return NextResponse.json({success:false,data:null,message:'Deals under this tag doesnot exist'},{status:500})

        }
        else{
             console.log('The fetched tagged deals are',data);
        return NextResponse.json({success:true,data:data,message:'Deals under this tag fetched successfully'},{status:200})
        }
       
    } catch (error:unknown) {

        if(error instanceof Error){
            console.log(error.message)
             

        }
        
    }

    
}