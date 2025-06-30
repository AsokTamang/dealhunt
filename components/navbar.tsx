"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";  //we must import the signin and signout from next-auth/react if we are using them in the client side but if we are using them on the server side then we must import them from auth.ts which is out server side code.
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition">
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
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="border-primary text-primary hover:bg-gray-100"
            >
              Dashboard
            </Button>
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
