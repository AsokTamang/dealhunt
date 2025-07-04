"use client";
import React from "react";
import { valueStore } from "@/store/dataStorage";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import Link from "next/link";

interface stateType {
  [link: string]: string;
}

interface tagType {
  tagTitle: string;
  link: string;
}

export default function Deals() {
  const { savedLinks, seeDeals, deleteDeal, addTag } = valueStore();
  const [tags, setTags] = React.useState<stateType>({}); //here we are defining a state which is an object having key-value pair where link is the key and tagname is a value and we are using[] here meaning there can be multiple links but these links have only one tag which means each link can have same tag but not multiple tags
 
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

  const handleClick = async (link: string) => {
    try {
      const { success, message } = await deleteDeal(link); //we are passing the link of an item to be deleted
      if (success) {
        toast.success(message);
      } else {
        toast.success(message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const handleClick2 = async (tag: tagType) => {
    try {
      const { success, message } = await addTag(tag); //we are passing the link of an item to be deleted
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const elements = savedLinks.map((item, index) => (
    <div
      key={index}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex-1 space-y-1">
        <h1 className="text-lg font-semibold text-gray-900 truncate">
          {item.title}
        </h1>
        {/**here using rel="noopener and noreferrer" prevents the using of our scripts from external website for security as well as hides our website url for privacy */}
        <Link href={item.link} target="_blank" rel="noopener noreferrer">
          <span className="text-sm text-blue-600 break-words">{item.link}</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <select
          onChange={(e) =>{
          
            setTags((prevState) => ({
              ...prevState,
              [item.link]: e.target.value,     //here we are just making the key-value pair of item's link and the tag being as a value
            }));}
          }
          value={tags[item.link] || ""}
          className="px-3 py-2 border rounded-lg text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option disabled value="">
            Attach a tag
          </option>
          <option value={"electronics"}>Electronics</option>
          <option value={"food"}>Food</option>
          <option value={"wears"}>Wearables</option>
          <option value={"cosmetics"}>Cosmetics</option>
          <option value={"athletics"}>Athletics</option>
          <option value={"Homekitchen"}>Home & kitchen</option>
          <option value={"ToysGames"}>Toys & Games</option>
          <option value={"TravelLuggage"}>Travel & Luggage</option>
          <option value={"HealthWellness"}>Health & Wellness</option>
        </select>

        {tags[item.link] && <Button
          variant="destructive"
          onClick={() =>{ 
           
            handleClick2({ tagTitle: tags[item.link], link: item.link });}}  //here we are passing the title as well as the link.
          className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          <IoIosAdd className="text-xl" />
        </Button>}

        <Button
          variant="destructive"
          onClick={() => handleClick(item.link)}
          className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
          aria-label={`Delete deal titled ${item.title}`}
        >
          <RiDeleteBin6Line className="text-xl" />
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {savedLinks.length === 0 ? (
        <p className="text-center text-gray-500">No deals saved yet.</p>
      ) : (
        elements
      )}
    </div>
  );
}
