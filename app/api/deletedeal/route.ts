import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(req:NextRequest) {
    await client.connect();
    const session=await auth();
    const {link}=await req.json();
    const db=client.db('dealhunt');
    const collection=db.collection('Deal');
    try {
         const deletedDeal=await collection.deleteOne({userid:session?.user.id,link})   //here we are deleting a deal based on the url provided into the req body.
         return NextResponse.json({success:true,data:deletedDeal,message:'Deal deleted successfully'},{status:200})
        
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
            return NextResponse.json({success:false,data:null,message:'Deal deletion unsuccessfull'},{status:500})
        }
        
    }
   
    
}