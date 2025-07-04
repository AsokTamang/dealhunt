"use client";
import React from "react";
import { valueStore } from "@/store/dataStorage";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";


interface commentType{
    [link:string]:string     //here we are defining the state type which is a key-value pair having link as a key and comment as a pair
}
interface valueType{
    link:string;
    comment:string;
}
interface shownType {
    [link:string]:boolean;
}

export default function Favourites() {
  const { fetchFavourites, favourites } = valueStore();
  const [shown, setShown] = React.useState<shownType>({});
  const [comments, setComments] = React.useState<commentType>({});

  React.useEffect(() => {
    const fetchDatas = async () => {
      try {
        const { success, message } = await fetchFavourites();
        if (success) {
          toast.success(message);
          return;
        } else {
          toast.error(message);
          return;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
          return;
        }
      }
    };
    fetchDatas();
  }, []);
  const handleClick = async (value:valueType) => {
    try {
      setShown((prev)=>({...prev,[value.link]:false}));   //here when the save comment button of that specific deal is clicked then we make the shown state ofthat link false
      const res = await axios.post("/api/addcomment", { value });
      const { success, data, message } = res.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const elements = favourites.map((item, i) => (
    <div
      key={i}
      className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-900 truncate mb-1">
        {item.title}
      </h2>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-words"
      >
        {item.link}
      </a>

      {!shown[item.link] ? (
        <>
          <span>Add a comment for your favorite deal</span>
          <button className="hover:text-2xl" onClick={() => setShown((prev)=>({...prev,[item.link]:true}))}>
            <GoPlus />
          </button>
        </>
      ) : (
        <>
          <Textarea
            
            onChange={(e)=>{setComments((prevState)=>({...prevState,[item.link]:e.target.value}))}}
          />
          <Button onClick={() => handleClick({link:item.link, comment:comments[item.link]})}>
            Save comment
          </Button>
        </>
      )}
    </div>
  ));

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Favourite Deals
      </h1>

      {favourites.length !== 0 ? (
        elements
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No deals are under your favourites currently.
        </p>
      )}
    </main>
  );
}
