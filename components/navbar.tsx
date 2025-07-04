"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";  //we must import the signin and signout from next-auth/react if we are using them in the client side but if we are using them on the server side then we must import them from auth.ts which is out server side code.
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-4">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-3xl font-bold text-primary hover:opacity-80 transition"
        >
          DealHunt
        </Link>

        {/* Auth Buttons */}
        {status === "unauthenticated" ? (
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="bg-primary text-white hover:bg-green-700 transition"
          >
            Sign in
          </Button>
        ) : (
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="border-primary text-primary hover:bg-gray-100"
            >
              Dashboard
            </Button>

            <Button
              onClick={() => router.push("/yourdeals")}
              variant="outline"
              className="border-primary text-primary hover:bg-gray-100"
            >
              Your deals
            </Button>


             <Button
              onClick={() => router.push("/favourites")}
              variant="outline"
              className="border-primary text-primary hover:bg-gray-100"
            >
              Your favourites
            </Button>

            <select
              onChange={(e) => {
                router.push(`/tagpage?tagname=${e.target.value.toLowerCase()}`);
                router.refresh();
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={''}     //here we are giving the value to the select element for the preselection option
            >
              <option disabled value="" >
                Select a deal tag
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

            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 text-white hover:bg-red-600 transition"
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
