"use client";
import React from "react";
import { valueStore } from "@/store/dataStorage";
import { Button } from "@/components/ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

interface stateType {
  [link: string]: string;
}

interface tagType {
  tagTitle: string;
  link: string;
}

export default function Deals() {
  const { savedLinks, seeDeals, deleteDeal, addTag, addToFav } = valueStore();
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

  const handleClick3 = async (link: string) => {
    try {
      const { success, message } = await addToFav(link); //we are passing the link of an item to be added to favorite
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

  const handleClick2 = async (tag: tagType) => {
    try {
      const { success, message } = await addTag(tag); //we are passing the tag title and link of an item to add a tag
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
      className="flex flex-col p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition bg-white"
    >
      <div className="flex-1 space-y-2">
        <h1 className="text-lg font-semibold text-gray-900 truncate max-w-full">
          {item.title}
        </h1>
        {/**here using rel="noopener and noreferrer" prevents the using of our scripts from external website for security as well as hides our website url for privacy */}
        <Link
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 break-words hover:underline max-w-full block"
        >
          {item.link}
        </Link>
      </div>

      <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">
        <div className="flex gap-2 flex-wrap w-full sm:w-auto">
          <select
            onChange={(e) => {
              setTags((prevState) => ({
                ...prevState,
                [item.link]: e.target.value, //here we are just making the key-value pair of item's link and the tag being as a value
              }));
            }}
            value={tags[item.link] || ""}
            className="px-3 py-2 border rounded-lg text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
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

          {tags[item.link] && (
            <Button
              variant="destructive"
              onClick={() => {
                handleClick2({ tagTitle: tags[item.link], link: item.link }); //here we are passing the title as well as the link.
              }}
              className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              <IoIosAdd className="text-xl" />
            </Button>
          )}
        </div>

        <div className="flex flex-row gap-2 items-center">
           <div className="flex flex-col items-center text-xs text-gray-600">
           <span>Delete</span>
          <Button
            variant="destructive"
            onClick={() => handleClick(item.link)}
            className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
            aria-label={`Delete deal titled ${item.title}`}
          >
            <RiDeleteBin6Line className="text-xl" />
          </Button>
          </div>


          <div className="flex flex-col items-center text-xs text-gray-600">
            <span>Favourite</span>
            <Button
              variant="destructive"
              onClick={() => handleClick3(item.link)}
              className="p-2 w-8 h-8 rounded-md bg-pink-500 hover:bg-pink-600 text-white transition-colors flex items-center justify-center"
              aria-label={`Add to favorite deal titled ${item.title}`}
            >
              <FaHeart className="text-sm" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-8
                 grid gap-6
                 grid-cols-1
                 sm:grid-cols-2
                 lg:grid-cols-3"
    >
      {savedLinks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg col-span-full">
          No deals saved yet.
        </p>
      ) : (
        elements
      )}
    </div>
  );
}
