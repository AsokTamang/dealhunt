"use client"
import React from "react";
import { valueStore } from "@/store/dataStorage";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import Link from "next/link";
export default function Deals() {
  const { savedLinks, seeDeals,deleteDeal } = valueStore();
  React.useEffect(() => {
    const fetchDatas = async () => {
      try {
        const res = await seeDeals();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchDatas();
  }, []);
  const handleClick=async(link:string)=>{
    try {
      const {success,message}=await deleteDeal(link);  //we are passing the link of an item to be deleted
      if(success){
        toast.success(message);

      }
      else{
      toast.success(message);}
    } catch (error:unknown) {
      if(error instanceof Error){
        console.log(error.message);
         toast.error(error.message);
       
      }
      
    }


  }
 const elements = savedLinks.map((item, index) => (
  <div
    key={index}
    className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
  >
    <div className="flex flex-col max-w-[75%]">
      <h1 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h1>
   {/**here using rel="noopener and noreferrer" prevents the using of our scripts from external website for security as well as hides our website url for privacy */}
    <Link href={item.link} target="_blank" rel="noopener noreferrer"><span className="text-sm text-blue-600 break-words">{item.link}</span></Link>  
    </div>
    <Button
      variant="destructive"
      onClick={() => handleClick(item.link)}
      className="ml-4 p-2 rounded-md hover:bg-red-600 hover:text-white transition-colors"
      aria-label={`Delete deal titled ${item.title}`}
    >
      <RiDeleteBin6Line className="text-xl" />
    </Button>
  </div>
));

  return (
   <div className="max-w-3xl mx-auto p-6 space-y-6">
    {savedLinks.length === 0 ? (
      <p className="text-center text-gray-500">No deals saved yet.</p>
    ) : (
      elements
    )}
  </div>
  )
}
