"use client"
import React from "react";
import { valueStore } from "@/store/dataStorage";
export default function Deals() {
  const { savedLinks, seeDeals } = valueStore();
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
  return <h1>saved deals are here!</h1>;
}
