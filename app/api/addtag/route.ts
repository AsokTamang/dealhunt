import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/auth";
export async function POST(req:NextRequest) {
    await client.connect();
    const session=await auth();
    const db=client.db('dealhunt');
    const collection=db.collection('Deal');
    const {tag}=await req.json();
    const link=tag.link;
    const tagname=tag.tagTitle;
    try {
         const existingTagged=await collection.findOne({userid:session?.user.id,link,tag:tagname.toLowerCase()});
         if(!existingTagged){
              const deal=await collection.updateOne({userid:session?.user.id,link},{$set:{tag:tagname.toLowerCase()}})  
              return NextResponse.json({success:true,data:deal,message:'Added tag to this deal'},{status:200})
         }
            //here we are finding the deal by using the link available in the requested body then we are inserting one more key value pair called tag using updateone in the collection.
        else{
             return NextResponse.json({success:false,data:null,message:'tag already added to this deal'},{status:500})
        }
          
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
             return NextResponse.json({success:false,data:null,message:'Addition of tag unsuccessful'},{status:500})
        }
        
    }
   


    
}