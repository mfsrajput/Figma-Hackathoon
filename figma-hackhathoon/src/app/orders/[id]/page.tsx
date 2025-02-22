"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import Image from "next/image";


const OrderDetails = () => {
  const { id } = useParams(); // Get order ID from URL
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const order = orders.find((order) => order._id === id); // Find order by ID

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrders()); // Fetch orders only if not already loaded
    }
  }, [dispatch, orders.length]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading order details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!order) {
    return <p className="text-center text-gray-500">Order with ID {id} not found.</p>;
  }

  return (
    <div className="container mx-auto px-10 py-12">
      <h1 className="text-gray-800 text-[40px] font-bold text-center mb-8">
        Order Details
      </h1>

      <div className="border border-gray-300 shadow-md p-6 rounded-lg bg-white">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Order #{order._id}
        </h2>
        <p className="text-sm text-gray-500">
          <strong>Order Date:</strong>{" "}
          {new Date(order.orderDate).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {order.firstName} {order.lastName}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Phone:</strong> {order.phone}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {order.street}, {order.city}, {order.province}, {order.zip}, {order.country}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Ordered Products:
          </h3>
          {order.cart?.length > 0 ? (
            <ul className="list-disc ml-4">
              {order.cart.map((product, index) => (
                <li key={product._id || index} className="mb-2">
                  <span className="font-medium">{product.name || "Unnamed Product"}</span>
                  <br />
                  <span className="text-gray-600 text-sm">
                    Price: <strong>${product.price?.toFixed(2) || "N/A"}</strong>
                  </span>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name || "No Image"}
                      className="w-16 h-16 object-cover mt-2"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image
                      src="/placeholder-image.png"
                      alt="Placeholder"
                      className="w-16 h-16 object-cover mt-2"
                      width={50}
                      height={50}
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
