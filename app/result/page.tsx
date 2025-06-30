"use client";
import React from "react";
import Link from "next/link";
import { valueStore } from "@/store/dataStorage";

export default function Result() {
  const { links, titles, images } = valueStore();

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
       Latest Deals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <ul className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">📰 Titles</h2>
          {titles.map((title, i) => (
            <li
              key={i}
              className="text-gray-700 text-sm mb-3 border-b pb-2 last:border-none"   //here last:border-none means the last elem doesnot has any border below it
            >
              {title}
            </li>
          ))}
        </ul>

        {/* Links */}
        <ul className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 break-words">
          <h2 className="text-xl font-semibold mb-4 text-primary"> Links</h2>
          {links.map((link, i) => (
            <li key={i} className="mb-3">
              <Link
                href={link}
                target="_blank"
                className="text-blue-600 hover:underline text-sm break-all"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Images */}
        <ul className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">🖼️ Images</h2>
          {images.map((img, i) =>
            img ? (
              <li key={i} className="mb-4">
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-40 object-cover rounded-lg shadow-sm"
                />
              </li>
            ) : (
              <li key={i} className="mb-4 text-sm text-gray-400 italic">
                No image available
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
