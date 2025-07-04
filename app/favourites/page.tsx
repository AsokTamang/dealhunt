"use client";
import React from "react";
import { valueStore } from "@/store/dataStorage";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";

interface commentType {
  [link: string]: string; //here we are defining the state type which is a key-value pair having link as a key and comment as a pair
}
interface valueType {
  link: string;
  comment: string;
}
interface shownType {
  [link: string]: boolean;
}

export default function Favourites() {
  const router = useRouter();
  const { fetchFavourites, favourites } = valueStore();
  const [shown, setShown] = React.useState<shownType>({});
  const [updatedShown, setUpdatedShown] = React.useState<shownType>({});
  const [comments, setComments] = React.useState<commentType>({});

  React.useEffect(() => {
    const fetchDatas = async () => {
      try {
        const { success, message } = await fetchFavourites(); //here we are using this function to fetch all the deals that are under fav list.
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

  const handleClick = async (value: valueType) => {
    try {
      setShown((prev) => ({ ...prev, [value.link]: false })); //here when the save comment button of that specific deal is clicked then we make the shown state ofthat link false

      const res = await axios.post("/api/addcomment", { value });
      const { success, message } = res.data;
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

  const handleClick2 = async (value: valueType) => {
    try {
      setUpdatedShown((prev) => ({ ...prev, [value.link]: false }));
      const res = await axios.put("/api/updatecomment", { value });
      const { success, message } = res.data;
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
      className="bg-white rounded-2xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow max-w-4xl mx-auto w-full"
    >
      <h2 className="text-xl font-semibold text-gray-900 truncate mb-1">
        {item.title}
      </h2>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-words text-sm sm:text-base"
      >
        {item.link}
      </a>

      <div className="mt-4 space-y-2">
        {item?.comment ? (
          <>
            <h1 className="font-medium text-gray-700">
              Your comment on this deal is:
            </h1>
            <div className="text-gray-800 bg-gray-100 p-2 rounded-md">
              {item.comment}
            </div>

            {!updatedShown[item.link] ? (
              <Button
                className="mt-2"
                onClick={() =>
                  setUpdatedShown((prev) => ({ ...prev, [item.link]: true }))
                }
              >
                <AiFillEdit className="mr-1" />
                Edit Comment
              </Button>
            ) : (
              <div className="transition-all duration-300 ease-in-out overflow-hidden">
                <Textarea
                  className="mt-2"
                  onChange={(e) => {
                    setComments((prevState) => ({
                      ...prevState,
                      [item.link]: e.target.value,
                    }));
                  }}
                />
                <Button
                  className="mt-2"
                  onClick={() => {
                    handleClick2({
                      link: item.link,
                      comment: comments[item.link],
                    });
                    window.location.reload();
                  }}
                >
                  Update Comment
                </Button>
              </div>
            )}
          </>
        ) : !shown[item.link] ? (
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <span>Add a comment for your favorite deal</span>
            <button
              className="text-xl hover:scale-125 transition-transform"
              onClick={() => {
                setShown((prev) => ({ ...prev, [item.link]: true }));
              }}
            >
              <GoPlus />
            </button>
          </div>
        ) : (
          <div className="transition-all duration-300 ease-in-out overflow-hidden">
            <Textarea
              className="mt-2"
              onChange={(e) => {
                setComments((prevState) => ({
                  ...prevState,
                  [item.link]: e.target.value,
                }));
              }}
            />
            <Button
              className="mt-2"
              onClick={() => {
                handleClick({ link: item.link, comment: comments[item.link] });
                window.location.reload();
              }}
            >
              Save Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Your Favourite Deals
      </h1>

      <div className="space-y-6">
        {favourites.length !== 0 ? (
          elements
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No deals are under your favourites currently.
          </p>
        )}
      </div>
    </main>
  );
}
