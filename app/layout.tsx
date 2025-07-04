import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Initializer from "@/components/appInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <SessionProvider>
            <Initializer />
            <Navbar />

            {children}
            <Toaster position="bottom-center" />
            <Footer />
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
