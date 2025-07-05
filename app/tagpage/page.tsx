"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { valueStore } from "@/store/dataStorage";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Tagpage() {
  const searchParams = useSearchParams();
  const { taggedDeals, fetchtagDeals } = valueStore();
  const tagname = searchParams.get("tagname");

  React.useEffect(() => {
    const fetchDatas = async () => {
      try {
        const { success, message } = await fetchtagDeals(tagname!);
        if (success) {
          toast.success(message);
          console.log("the fetched tagged deals are :", taggedDeals);
        } else {
          toast.error(message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchDatas();
  }, [tagname]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Deals under <span className="capitalize text-green-600">{tagname}</span>
      </h1>

      {taggedDeals.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No deals saved under this tag.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {taggedDeals.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="mb-3">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-words text-sm"
              >
                {item.link}
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Button asChild variant="outline">
          <Link href="/dashboard">← Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
