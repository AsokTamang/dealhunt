"use client";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Result() {
  const [links, setLinks] = React.useState([]);
  const [titles, setTitles] = React.useState([]);
  const[images,setImages]= React.useState([]);

  const searchParams = useSearchParams();
  const sitelink = JSON.parse(
    decodeURIComponent(searchParams.get("sitelink")!)
  ); // as output is used as a key in our params so we must use output here while using searchParams.get()...
  const siteTitle = JSON.parse(
    decodeURIComponent(searchParams.get("sitetitle")!)
  );
  const siteImage = JSON.parse(
    decodeURIComponent(searchParams.get("siteimage")!)
  );


  React.useEffect(() => {
    setLinks(sitelink);
    setTitles(siteTitle);
    setImages(siteImage);
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Deals and their links</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Titles Section */}
        <ul className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Deals</h2>
          {titles.map((title: any, index: any) => (
            <li key={index} className="mb-3">
              <h3 className="text-gray-700">{title}</h3>
            </li>
          ))}
        </ul>

        {/* Links Section */}
        <ul className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Visit the links</h2>
          {links.map((link: any, index: any) => (
            <li key={index} className="mb-3">
              <Link
                href={link}
                className="text-blue-600 hover:underline break-all"
                target="_blank"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Some images</h2>
          {images.map((image: any, index: any) => (
            <li key={index} className="mb-3">
            
             <img
                src={image}
                alt="thumbnail"
             
              
              />
             
               
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
