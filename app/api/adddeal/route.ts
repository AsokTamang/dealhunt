import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/lib/db";
export async function POST(req:NextRequest) {   
    const session=await auth();
    const {title,link} = await req.json();   //we are extracting the title and link of url from the requested body.
    await client.connect();
    const db=client.db('dealhunt');  //here we are using the dealhunt database
    const collection=db.collection('Deal');   //here we are using the Deal or deals in mongodbatlas collection
    try {
        const existingDeal=await collection.findOne({title,link});  //first we need to check if the link is already saved or not.
        if(!existingDeal){   //if not then only we save the link
             const saveDeal=await collection.insertOne({userid:session?.user.id,title,link})   //here we are saving the userid with title as well as link and ofcourse the id of the user also.
             return NextResponse.json({success:true,data:saveDeal,message:'deal saved successfully'});

        }
        return NextResponse.json({success:false,data:null,message:'deal already exists'});
       
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message)
              return NextResponse.json({success:false,data:null,message:'failed saving the deal'});

        }


        
    } 

    
}