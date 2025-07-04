import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/auth";
export async function POST(req: NextRequest) {
  await client.connect();
  const session = await auth();
  const db = client.db("dealhunt");
  const collection = db.collection("Deal");
  const { link } = await req.json();
  
  try {
   const existingTaggedDeal=await collection.findOne({userid:session?.user.id,link:link});
   if(existingTaggedDeal?.status){     //here we are checking if the status exists or not in this link if yes then we dont add the status which is fav
     return NextResponse.json(
        {
          success: false,
          data: null,
          message: "deal already added to favourite list ",
        },
        { status: 409 }
      );
   }
 
     const deal = await collection.updateOne(      //if the status is not added then we add the status if the user wants to
      { userid: session?.user.id, link: link },
      { $set: { status:'fav' } }
    );
      return NextResponse.json(
        { success: true, data: deal, message: "Deal added to favourite list" },
        { status: 200 }
      );
   


   
   
   
   
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { success: false, data: null, message: "Addition of tag unsuccessful" },
        { status: 500 }
      );
    }
  }
}
