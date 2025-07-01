import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const {category,price,rate, item, location } = await req.json();
  const query = `buy ${item} ${category} deals under ${price} ${rate} rating ${location}`;


  try {
    const res = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: process.env.CUSTOM_SEARCH_API_KEY,
        cx: process.env.cx,
        q: query,
      },
    });

    const data = res.data;
    if (Array.isArray(data.items)) {
      return NextResponse.json({ success: true, data: data.items }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, data: [] }, { status: 200 });
    }
  } catch (error) {
    console.error("Google API Error:", error);
    return NextResponse.json({ success: false, data: null }, { status: 500 });
  }
}
