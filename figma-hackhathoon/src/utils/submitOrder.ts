// src/utils/submitOrder.ts
"use server"; // Runs this function only on the server in Next.js 15

import { editorClient } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique keys

export const submitOrder = async (orderData: any) => {
  try {
    const newOrder = await editorClient.create({
      _type: "order",
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      email: orderData.email,
      phone: orderData.phone,
      street: orderData.street,
      city: orderData.city,
      province: orderData.province,
      zip: orderData.zip,
      country: orderData.country,
      orderDate: new Date().toISOString(),
      status: "pending",
      total: orderData.total,
      cart: orderData.cart.map((item: any) => ({
        _key: uuidv4(), // Unique key for each item in the cart
        _id: item._id || uuidv4(), // Ensure each item has a valid _id
        name: item.name || "Unknown Product", // Provide default name if missing
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image || "", // Prevent null image
      })),
    });

    // console.log("✅ Order Submitted Successfully:", newOrder);
    return { success: true, order: newOrder };
  } catch (error) {
    console.error("❌ Error Submitting Order:", error);
    return { success: false, error: (error as Error).message };
  }
};