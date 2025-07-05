// === FILE: /app/dashboard/page.tsx ===
"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { valueStore } from "@/store/dataStorage";

export default function Dashboard() {
  const router = useRouter();
  const [item, setItem] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { fetchDatas } = valueStore();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await fetchDatas(
      category,
      price,
      rate,
      item,
      location
    );
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
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option>Select the Category</option>
            <option value={"electronics"}>electronics</option>
            <option value={"foods"}>Foods</option>
            <option value={"clothes"}>Clothes</option>
            <option value={"houseware"}>Housewares</option>
            <option value={"Sports"}>Sports</option>
            <option value={"Music"}>Music</option>
            <option value={"transportation"}>vehicles</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Price</label>
          <select onChange={(e) => setPrice(e.target.value)}>
            <option>Select the price range</option>
            <option value={"0-$50"}>under $50</option>
            <option value={"$100-$500"}>$100-$500</option>
            <option value={"$500-$1000"}>$500-$1000</option>
            <option value={"over $1000"}>over $1000</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Rate</label>
          <select onChange={(e) => setRate(e.target.value)}>
            <option>Select the item ratings</option>
            <option value={"5 star"}>⭐⭐⭐⭐⭐</option>
            <option value={"4 star"}>⭐⭐⭐⭐</option>
            <option value={"3 star"}>⭐⭐⭐</option>
          </select>
        </div>

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

        <Button type="submit">{loading ? "Searching..." : "Search"}</Button>
      </form>
    </div>
  );
}
