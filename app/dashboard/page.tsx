"use client";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Dashboard() {
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-primary text-center">
          Welcome to DealHunt Dashboard
        </h1>

        {/* Search Item Input */}
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

        {/* Search Location Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Search location
          </label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Toronto, Mississauga"
            required
            className="w-full"
          />
        </div>

      
      </div>
    </main>
  );
}
