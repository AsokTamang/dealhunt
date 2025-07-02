"use client"
import React from "react";
import { useSearchParams } from "next/navigation"
import Link from "next/link";
import { valueStore } from "@/store/dataStorage";
export default function Tagpage(){
    const searchParams=useSearchParams();
    const {taggedDeals,fetchtagDeals}=valueStore();
    const tagname=searchParams.get('tagname');
    
    React.useEffect(()=>{

        const fetchDatas=async()=>{
            try {
                const res=await fetchtagDeals(tagname!);
                
            
            } catch (error:unknown) {
                if(error instanceof Error){
                    console.log(error.message);

                }

                
            }
        };
        fetchDatas();

    },[tagname]);

    const elements=taggedDeals.map((item,index)=>
        <div key={index}>
    <h1>{item.tag}</h1>
    <h1>{item.title}</h1>
    <Link href={item.link} rel="noopenner noreferrer"><span>{item.link}</span></Link>
    </div>
       )

    return(
     <div>
         {taggedDeals.length > 0 ? elements :
            <div>
              No deals saved under this tag  
                </div>}
     </div>
           

      
    )
}