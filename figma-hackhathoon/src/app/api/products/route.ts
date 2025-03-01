
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const data = await client.fetch(allProducts);

    return  NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return new NextResponse('Error fetching data', { status: 500 });
  }
}
