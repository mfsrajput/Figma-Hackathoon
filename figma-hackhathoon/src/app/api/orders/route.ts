import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.cart || !Array.isArray(body.cart)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    const newOrder = {
      _type: "order",
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      country: body.country,
      postalCode: body.postalCode,
      stripeSessionId: body.stripeSessionId, // Include if using Stripe
      total: body.total,
      cart: body.cart.map((item: any) => ({
        _type: "cartItem",
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    const savedOrder = await client.create(newOrder);
    // console.log("✅ Order Saved:", savedOrder);

    return NextResponse.json({ message: "Order saved successfully", order: savedOrder }, { status: 201 });
  } catch (error) {
    console.error("❌ Order Submission Error:", error);
    return NextResponse.json({ error: "Failed to submit order" }, { status: 500 });
  }
}

