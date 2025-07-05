"use client";
import React from "react";
import Link from "next/link";
import { valueStore } from "@/store/dataStorage";
import { Button } from "@/components/ui/button";
import { toast  } from "react-hot-toast";
import Image from "next/image";

export default function Result() {
  const { links, titles, images,saveDeal } = valueStore();
  

  const saveLink=async(i:number)=>{
    const newTitle=titles[i];
    const newLink=links[i];    //here we are extracting the newLink.
    const {success,message}=await saveDeal(newTitle,newLink);  
    if(success){
      toast.success(message);


    }
    else{
      toast.error(message);
    }


  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
       Latest Deals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <ul className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">📰 Titles</h2>
          {titles.map((title, i) => (
            <li
              key={i}
              className="text-gray-700 text-sm mb-3 border-b pb-2 last:border-none"   //here last:border-none means the last elem doesnot has any border below it
            >
              {title}
            </li>
          ))}
        </ul>

        {/* Links */}
        <ul className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 break-words">
  <h2 className="text-xl font-semibold mb-4 text-primary">Links</h2>
  {links.map((link, i) => (
    <li
      key={i}
      className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm flex flex-col gap-2"
    >
      <Link
        href={link}
        target="_blank"
        className="text-blue-600 hover:underline text-sm break-all"
        rel="noopener noreferrer"
      >
        {link}
      </Link>

      <Button
        onClick={() => saveLink(i)}
        variant="secondary" // use variant if your Button supports it (like shadcn/ui)
        className="w-fit text-sm hover:bg-green-500"
      > Save this deal
      </Button>
    </li>
  ))}
</ul>


        {/* Images */}
        <ul className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">🖼️ Images</h2>
          {images.map((img, i) =>
            img ? (
              <li key={i} className="mb-4">
                <Image
                width={65}
                height={65}
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-40 object-cover rounded-lg shadow-sm"
                />
              </li>
            ) : (
              <li key={i} className="mb-4 text-sm text-gray-400 italic">
                No image available
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
