"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Navigation } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [item, setItem] = React.useState("");
  const[loading,setLoading]=React.useState(false);

  const [location, setLocation] = React.useState("");

  const handleClick = async () => {
    setLoading(true);
    const res = await axios.post(
      "/api/search",
      { item, location },
      {
        //here we are passing the item as well as location in this endpoint to search using the google custom search engine
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    try {
      const { success, data } = await res.data;
      if (success) {

        router.push(
          `/result?sitelink=${encodeURIComponent(JSON.stringify(data.map((item:any)=>item.link)))}&sitetitle=${encodeURIComponent(JSON.stringify(data.map((item:any)=>item.title)))}&siteimage=${encodeURIComponent(JSON.stringify(data.map((item:any)=>item.pagemap.cse_thumbnail[0].src)))}`
        ); //then we are moving to the result page with having a searchParams of result data with its link,title and the image src.
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-primary text-center">
          Welcome to DealHunt Dashboard
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Search item
          </label>
          <Input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g. iPhone, T-shirt, Pizza"
            required
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Search location
          </label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button onClick={() => handleClick()}>{loading?'Searching':'Search'}</Button>
      </div>
    </div>
  );
}
