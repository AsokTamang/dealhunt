"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-8 space-y-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to DealHunt{" "}
        </h1>
        <p className="text-gray-700 text-lg">
          Discover the latest deals and discounts on your favorite items —
          anytime, anywhere. Simply enter the <strong>item name</strong> and{" "}
          <strong>your location</strong>.
        </p>

        <p className="text-gray-600">
          Whether you're searching for an iPhone in Toronto or sneakers in
          Vancouver, DealHunt helps you explore the best prices across the web.
        </p>

        <Link href="/dashboard">
          <Button className="mt-4 px-6 py-3 text-lg">Start Searching</Button>
        </Link>
      </div>
    </main>
  );
}
