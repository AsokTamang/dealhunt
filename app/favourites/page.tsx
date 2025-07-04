"use client";
import React from "react";
import { valueStore } from "@/store/dataStorage";
import toast from "react-hot-toast";

export default function Favourites() {
  const { fetchFavourites, favourites } = valueStore();

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

  const elements = favourites.map((item, i) => (
    <div
      key={i}
      className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-900 truncate mb-1">{item.title}</h2>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-words"
      >
        {item.link}
      </a>
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
