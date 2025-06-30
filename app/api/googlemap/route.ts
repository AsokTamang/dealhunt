"use server"
import {Client} from "@googlemaps/google-maps-services-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){  
    const {data}=await req.json();
    const client = new Client({});    // to use the imported Client we must assign the instance of new client
   try {
    const res = await client
  .placeAutocomplete({   //so placeautocomplete returns the location name or detail as a variable named description based on the input entered by the user.
    params: {
      input:data,
      key: process.env.MAPS_API_KEY!,
    }
  });
 
  return NextResponse.json({success:true,data:res.data.predictions},{status:200});      //this returns the list of predicted locations
  

    
   } catch (error:unknown) {
    if(error instanceof Error){
        console.log(error.message);
        return NextResponse.json({success:false,data:null},{status:500});
        
    }
    
    
   }

}