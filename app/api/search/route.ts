//our custom google search
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { item, location } = await req.json();
  const query = `${item} deals and offers at ${location} today`;
 try {
     const res =await axios.get(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.CUSTOM_SEARCH_API_KEY}&cx=${process.env.cx}&q=${query}`
  ); //then we are using get method to retrieve the search results
    const data=await res.data;
    console.log(data.items)  //we are console logging the data.items to check if we get the response from googleapis
    return NextResponse.json({success:true,data:data.items},{status:200});
 } catch (error:unknown) {
    if(error instanceof Error){
        console.log(error.message);
        return NextResponse.json({success:false,data:null},{status:500});
    }

    
 }
 
  
}
