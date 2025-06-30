// === FILE: /app/dashboard/page.tsx ===
"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { valueStore } from "@/store/dataStorage";

export default function Dashboard() {
  const router = useRouter();
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { fetchDatas } = valueStore();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await fetchDatas(item, location);
    console.log("Client response:", success, message);

    if (success) {
      setLoading(false);
      router.push("/result");
    } else {
      setLoading(false);
      alert("Search failed. " + message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleClick}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-primary text-center">
          Welcome to DealHunt Dashboard
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Search item</label>
          <Input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g. iPhone, T-shirt, Pizza"
            required
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Search location</label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <Button type="submit">{loading ? "Searching..." : "Search"}</Button>
      </form>
    </div>
  );
}