// app/api/submitOrder/route.ts
import { NextResponse } from "next/server";
import { submitOrder } from "@/utils/submitOrder";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    const result = await submitOrder(orderData);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: result.order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
