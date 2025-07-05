"use client"
import React from "react";
import { valueStore } from "@/store/dataStorage";
import { useSession } from "next-auth/react";
export default function Initializer() {
  //this component is for initializing the fetch functions inorder to populate the stores of zustand.
  const { status } = useSession();

  const { seeDeals, fetchFavourites, savedLinks, favourites } = valueStore();
  React.useEffect(() => {
    if (status === "authenticated") {
      if (savedLinks.length === 0) {
        //if only the links are not already populated then only we use seeDeals() to populate the savedlinks during the login of the user
        seeDeals();
      }
      if (favourites.length === 0) {
        //if only the favLinks are not already populated then only we use fetchFavourites() to populate the favourites during the login of the user
        fetchFavourites();
      }
    }
  }, [status]);

  return null;
}
