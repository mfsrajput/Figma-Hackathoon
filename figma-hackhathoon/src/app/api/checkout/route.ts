import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();

    const lineItems = cart.map((product: any) => ({
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      line_items: lineItems,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating Stripe session' }, { status: 500 });
  }
}