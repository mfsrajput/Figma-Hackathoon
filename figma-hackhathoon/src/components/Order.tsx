"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; 

const Order = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    // console.log("🔹 Dispatching fetchOrders...");
    dispatch(fetchOrders()).then(() => {
      // console.log("✅ Fetch completed.");
    });

    // Fetch orders directly from Sanity and log the result
    client
      .fetch('*[_type == "order"]')
      // .then((data) => console.log("📝 Orders from Sanity:", data))
      .catch((error) => console.error("❌ Error fetching orders from Sanity:", error));
  }, [dispatch]);

  useEffect(() => {
    // console.log("📦 Redux Orders State Updated:", orders);
  }, [orders]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-10 py-12">
      <h1 className="text-gray-800 text-[40px] font-bold text-center mb-8">
        Customer Orders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.length > 0 ? (
          orders.map((order, index) => 
            (
            
            <div
              key={order._id}
              className="border border-gray-300 shadow-md p-6 rounded-lg bg-white"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Order #{index + 1}
                </h2>
                <p className="text-sm text-gray-500">
                  <strong>Order Date:</strong>{" "}
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {order.firstName} {order.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {order.street}, {order.city},{" "}
                  {order.province}, {order.zip}, {order.country}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Ordered Products:
                </h3>
                {order.cart?.length > 0 ? (
  <ul className="list-disc ml-4">
    {order.cart.map((product, index) => {
      if (!product) return <li key={index} className="text-red-500">Invalid Product</li>;
       // Safely access product properties
       const productName = product.name || "Unnamed Product";
       const productPrice = product.price ? product.price.toFixed(2) : "N/A";
       const productImage = product.image || null; // Adjusted for "image" field in your data

      return (
        <li key={product._id || index} className="mb-2">
          <span className="font-medium">{productName}</span>
          <br />
          <span className="text-gray-600 text-sm">
            Price: <strong>${productPrice}</strong>
          </span>
          {productImage ? (
            <Image
              src={productImage}
              alt={productName || "No Image"}
              className="w-16 h-16 object-cover mt-2"
              width={50}
              height={50}
            />
          ) : (
            <p className="text-red-500 text-sm">Image not available</p>
          )}
        </li>
      );
    })}
  </ul>
) :
 (
  <p className="text-sm text-gray-500">No products found</p>
)}
                {/* {order.cart?.length > 0 ? (
                  <ul className="list-disc ml-4">
                    {order.cart.map((product, index) => (
                      <li key={product._id || index} className="mb-2">
                        <span className="font-medium">{product.title || "Unnamed Product"}</span>
                        <br />
                        <span className="text-gray-600 text-sm">
                          Price: <strong>${product.price.toFixed(2)}</strong>
                        </span>
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.title || "No Image"}
                            className="w-16 h-16 object-cover mt-2"
                            width={50}
                            height={50}
                          />
                        ) : (
                          <p className="text-red-500 text-sm">Image not available</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No products found</p>
                )} */}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800">
                  Total: ${order.total.toFixed(2)}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "dispatch"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;



// "use client";

// import { client } from "@/sanity/lib/client";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   quantity?: number;
// }

// interface Order {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   street: string;
//   city: string;
//   province: string;
//   zip: string;
//   country: string;
//   orderDate: string;
//   status: string;
//   total: number;
//   cart: Product[];
// }

// const Order = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const ordersData = await client.fetch(
//           `*[_type == "order"]{
//             _id,
//             firstName,
//             lastName,
//             email,
//             phone,
//             street,
//             city,
//             province,
//             zip,
//             country,
//             orderDate,
//             status,
//             total,
//             cart[]{
//               _id,
//               title,
//               price,
//               "imageUrl": productImage.asset->url
//             }
//           }`
//         );
//         setOrders(ordersData);
//       } catch (error) {
//         console.error("❌ Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading orders...</p>;
//   }

//   return (
//     <div className="container mx-auto px-10 py-12">
//       <h1 className="text-gray-800 text-[40px] font-bold text-center mb-8">
//         Customer Orders
//       </h1>

//       {/* Order List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {orders.length > 0 ? (
//           orders.map((order, index) => (
//             <div
//               key={order._id}
//               className="border border-gray-300 shadow-md p-6 rounded-lg bg-white"
//             >
//               {/* Customer Details */}
//               <div className="mb-4">
//                 <h2 className="text-xl font-semibold text-gray-700">
//                   Order #{index + 1}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   <strong>Order Date:</strong>{" "}
//                   {order.orderDate
//                     ? new Date(order.orderDate).toLocaleString("en-US", {
//                         weekday: "long",
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })
//                     : "N/A"}
//                 </p>
//               </div>

//               {/* Address Details */}
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {order.firstName} {order.lastName}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Phone:</strong> {order.phone}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Address:</strong> {order.street}, {order.city},{" "}
//                   {order.province}, {order.zip}, {order.country}
//                 </p>
//               </div>

//               {/* Products Ordered */}
//               <div className="mb-4">
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">
//                   Ordered Products:
//                 </h3>
//                 {order.cart?.length > 0 ? (
//                   <ul className="list-disc ml-4">
//                     {order.cart.map((product, index) => (
//                       <li key={product._id || index} className="mb-2">
//                         <span className="font-medium">{product.title || "Unnamed Product"}</span>
//                         <br />
//                         <span className="text-gray-600 text-sm">
//                           Price: <strong>${product.price.toFixed(2)}</strong>
//                         </span>
//                         {/* Display Image */}
//                         {product.imageUrl ? (
//                           <Image
//                             src={product.imageUrl}
//                             alt={product.title || "No Image"}
//                             className="w-16 h-16 object-cover mt-2"
//                             width={50}
//                             height={50}
//                           />
//                         ) : (
//                           <p className="text-red-500 text-sm">Image not available</p>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm text-gray-500">No products found</p>
//                 )}
//               </div>

//               {/* Total Price & Status */}
//               <div className="flex justify-between items-center">
//                 <p className="text-lg font-semibold text-gray-800">
//                   Total: ${order.total.toFixed(2)}
//                 </p>

//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     order.status === "pending"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : order.status === "dispatch"
//                       ? "bg-blue-200 text-blue-800"
//                       : "bg-green-200 text-green-800"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-2">
//             No orders found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Order;
