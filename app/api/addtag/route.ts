import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/auth";
export async function POST(req: NextRequest) {
  await client.connect();
  const session = await auth();
  const db = client.db("dealhunt");
  const collection = db.collection("Deal");
  const { tag } = await req.json();
  const link = tag.link;
  const tagname = tag.tagTitle.toLowerCase();
  try {
   const existingTaggedDeal=await collection.findOne({userid:session?.user.id,link:link});
   if(existingTaggedDeal?.tag){     //here we are checking if the tag exists or not in this link
     return NextResponse.json(
        {
          success: false,
          data: null,
          message: "tag already added to this deal",
        },
        { status: 409 }
      );
   }
 
     const deal = await collection.updateOne(         //here at first we are just adding the tag to the link using updateOne and $addToSet method
      { userid: session?.user.id, link: link },
      { $set: { tag: tagname.toLowerCase() } }
    );
      return NextResponse.json(
        { success: true, data: deal, message: "Added tag to this deal" },
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
