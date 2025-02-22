"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { submitOrder } from "@/utils/orderService";
import { RootState } from "@/redux/store";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [loading, setLoading] = useState(false); // Track form submission

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation for empty fields
  if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.postalCode || !formData.country) {
    alert("Please fill out all required fields.");
    setLoading(false);
    return;
  }

    try {
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const orderData = {
        _type: "order",
        firstName: formData.name,
        lastName: "", // Optional
        email: formData.email,
        phone: "", // Optional
        street: formData.address,
        city: formData.city,
        province: "", // Optional
        zip: formData.postalCode,
        country: formData.country,
        total: totalPrice,
        cart: cartItems.map(item => ({
          _id: item.id, // Ensure the item has a valid ID
          name: item.name, // Include the product name
          price: item.price, // Include product price
          quantity: item.quantity, // Include quantity
          image: item.image || "", // Ensure images are sent
        })),
      };

      const newOrder = await submitOrder(orderData);

      if (newOrder) {
        // console.log("✅ Order Submitted Successfully:", newOrder);
        dispatch(clearCart()); // Clear cart only if order succeeds
        router.push("/order-success"); // Redirect
      } else {
        throw new Error("Order submission failed!");
      }
    } catch (error) {
      console.error("❌ Order Submission Error:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded mt-6 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Complete Checkout"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;



// import { useSelector, useDispatch  } from 'react-redux';
// import { clearCart } from '@/redux/slices/cartSlice';
// import { useRouter } from 'next/navigation';
// import { submitOrder } from "@/utils/orderService";

// const CheckoutForm = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: '',
//     cardNumber: '',
//     cardExpiry: '',
//     cardCvc: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you could handle the payment process and order submission.

//     // Clear the cart after checkout
//     dispatch(clearCart());

//     // Redirect to a confirmation or success page
//     router.push('/order-success');
//   };

//   return (
//     <div className="border rounded p-6">
//       <h2 className="text-2xl font-bold mb-6">Checkout</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//             Address
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//             City
//           </label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
//             Postal Code
//           </label>
//           <input
//             type="text"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//             Country
//           </label>
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
//             Card Number
//           </label>
//           <input
//             type="text"
//             name="cardNumber"
//             value={formData.cardNumber}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div className="flex space-x-4">
//           <div className="w-1/2">
//             <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
//               Expiry Date
//             </label>
//             <input
//               type="text"
//               name="cardExpiry"
//               value={formData.cardExpiry}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="w-1/2">
//             <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
//               CVC
//             </label>
//             <input
//               type="text"
//               name="cardCvc"
//               value={formData.cardCvc}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-600 text-white rounded mt-6 hover:bg-blue-700"
//         >
//           Complete Checkout
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;





