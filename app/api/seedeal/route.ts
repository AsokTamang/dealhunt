import { auth } from "@/auth";
import client from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
    await client.connect();  //here we are connecting to our mongodb through mmongoclient
    const session=await auth();
    const db=client.db('dealhunt');
    const collection=db.collection('Deal');
    try {
         const allLinks=await collection.find({userid:session?.user.id}).toArray();  //then we are finding all the links based on this logged in user.
         console.log('the saved links are ',allLinks);
         return NextResponse.json({success:true,data:allLinks,message:'Links found successfully'},{status:200});

        
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
            return NextResponse.json({success:false,data:null,message:error.message},{status:500});
        }
        
    }
   


    
}