// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();

//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//     });

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("❌ Stripe Payment Error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { client } from '@/sanity/lib/client';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("📦 Received request body:", body); // Debugging

    if (!body.cart || !Array.isArray(body.cart)) {
      console.error("❌ cart is missing or not an array:", body.cart);
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    const lineItems = body.cart.map((product: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      line_items: lineItems,
    });

    // ✅ Store order in Sanity
    const order = {
      _type: "order",
      stripeSessionId: session.id,
      totalAmount: body.cart.reduce((total: number, item: { price: number; quantity: number }) => 
        total + item.price * item.quantity, 
        0
      ),
      items: body.cart.map((item: any) => ({
        name: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: new Date().toISOString(),
    };

    await client.create(order);

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Payment Error:", error);
    return NextResponse.json({ error: 'Error creating Stripe session' }, { status: 500 });
  }
}