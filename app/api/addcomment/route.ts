import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    await client.connect();
    const session = await auth();
    const db = client.db("dealhunt");
    const collection = db.collection("Deal");
    const { value } = await req.json();
    const link = value.link;
    const comments = value.comment;
    if (comments === "" || !comments || comments === undefined) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Bad request or wrong input from the user.",
        },
        { status: 400 } //bad req
      );
    }
    const existingDeal = await collection.findOne({
      userid: session?.user.id,
      link: link,
    });
    if (existingDeal?.comment) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "comment already added to this deal",
        },
        { status: 409 }
      );
    } else {
      const deal = await collection.updateOne(
        //here at first we are just adding the tag to the link using updateOne and $addToSet method
        { userid: session?.user.id, link: link },
        { $set: { comment: comments } }
      );
      return NextResponse.json(
        { success: true, data: deal, message: "Added comment to this deal" },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Addition of comment unsuccessful",
        },
        { status: 500 }
      );
    }
  }
}
