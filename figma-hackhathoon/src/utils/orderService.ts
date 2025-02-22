// src/utils/submitOrder.ts
"use server"; // Runs this function only on the server in Next.js 15

import { editorClient } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique keys


export const submitOrder = async (orderData: any) => {
  try {
    // Check if cart is not empty
    if (!orderData.cart || orderData.cart.length === 0) {
      throw new Error("Cart cannot be empty.");
    }

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
      status: "pending", // Initially set as pending
      total: orderData.total,
      cart: orderData.cart.map((item: any) => {
        if (!item._id) {
          throw new Error("Missing product _id in cart item.");
        }
        return {
          _key: uuidv4(), // Unique key for each item
          _id: item._id || uuidv4(), // Use product _id or generate one
          name: item.name || "Unknown Product", // Default name if missing
          price: item.price,
          quantity: item.quantity,
          size: item.size || "N/A", // Default size if missing
          color: item.color || "N/A", // Default color if missing
          image: item.image || "", // Ensure image is not null
        };
      }),
    });

    // console.log("✅ Order Submitted Successfully:", newOrder);
    return { success: true, order: newOrder };
  } catch (error) {
    console.error("❌ Error Submitting Order:", error);
    return { success: false, error: (error as Error).message };
  }
};


// import { client } from "@/sanity/lib/client";

// export const submitOrder = async (orderData: any) => {
//   try {
//     const newOrder = await client.create({
//       _type: "order",
//       firstName: orderData.firstName,
//       lastName: orderData.lastName,
//       email: orderData.email,
//       phone: orderData.phone,
//       street: orderData.street,
//       city: orderData.city,
//       province: orderData.province,
//       zip: orderData.zip,
//       country: orderData.country,
//       orderDate: new Date().toISOString(),
//       status: "pending",
//       total: orderData.total,
//       cart: orderData.cart.map((item: any) => ({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         size: item.size,
//         color: item.color,
//         image: item.image,
//       })),
//     });

//     console.log("✅ Order Submitted Successfully:", newOrder);
//     return newOrder;
//   } catch (error) {
//     console.error("❌ Error Submitting Order:", error);
//     throw error;
//   }
// };
