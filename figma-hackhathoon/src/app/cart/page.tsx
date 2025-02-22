'use client'

import { useCart } from "@/hooks/useCart"  // Import useCart from hooks
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation' // Import useRouter

export default function CartPage() {
  const { cart, addCartItem, removeCartItem, updateCartItemQuantity } = useCart(); // Use useCart hook
  const router = useRouter(); // Initialize router

  const handleProceedToCheckout = () => {
    router.push('/checkout'); // Navigate to checkout page
  };

  // Function to handle quantity change
  const handleQuantityChange = (id: string, delta: number) => {
    const item = cart.items.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateCartItemQuantity(id, newQuantity); // Update quantity using Redux
      } else {
        removeCartItem(id); // Remove item if quantity reaches 0
      }
    }
  };

  // Function to remove item
  const handleRemoveItem = (id: string) => {
    removeCartItem(id); // Remove item using Redux
  };

  // Calculate subtotal, tax, and total
  const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.1; // 10% tax
  const shippingFee = 1500; // Flat shipping fee
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingFee;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items List */}
      {cart.items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>
                  <p className="text-sm">Rs. {item.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Remove Item Button */}
              <Button variant="outline" size="sm" onClick={() => handleRemoveItem(item.id)}>
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Totals */}
      {cart.items.length > 0 && (
        <div className="bg-muted/30 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span>Rs. {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Rs. {shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
          <Button className="w-full mt-4 bg-[#B88E2F] text-white" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}


// 'use client'

// import { useCart } from "@/components/CartProvider"
// import { Button } from "@/components/ui/button"
// import { Minus, Plus, Trash } from 'lucide-react'
// import { useRouter } from 'next/navigation' // Import useRouter

// export default function CartPage() {
//   const { state, dispatch } = useCart();
//   const router = useRouter(); // Initialize router

//   const handleProceedToCheckout = () => {
//     router.push('/checkout'); // Navigate to checkout page
//   };

//   // Function to handle quantity change
//   const handleQuantityChange = (id: string, delta: number) => {
//     const item = state.items.find(item => item.id === id);
//     if (item) {
//       const newQuantity = item.quantity + delta;
//       if (newQuantity > 0) {
//         dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } });
//       } else {
//         dispatch({ type: "REMOVE_ITEM", payload: id }); // Remove item if quantity reaches 0
//       }
//     }
//   };

//   // Function to remove item
//   const handleRemoveItem = (id: string) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   };

//   // Calculate subtotal, tax, and total
//   const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
//   const taxRate = 0.1; // 10% tax
//   const shippingFee = 1500; // Flat shipping fee
//   const tax = subtotal * taxRate;
//   const total = subtotal + tax + shippingFee;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {/* Cart Items List */}
//       {state.items.length === 0 ? (
//         <p className="text-center text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {state.items.map((item) => (
//             <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg">
//               <div className="flex items-center gap-4">
//                 <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
//                 <div>
//                   <h2 className="font-semibold">{item.name}</h2>
//                   <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>
//                   <p className="text-sm">Rs. {item.price.toLocaleString()}</p>
//                 </div>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center gap-3">
//                 <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>
//                   <Minus className="w-4 h-4" />
//                 </Button>
//                 <span className="w-8 text-center">{item.quantity}</span>
//                 <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>
//                   <Plus className="w-4 h-4" />
//                 </Button>
//               </div>

//               {/* Remove Item Button */}
//               <Button variant="outline" size="sm" onClick={() => handleRemoveItem(item.id)}>
//                 <Trash className="w-4 h-4 text-red-500" />
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Cart Totals */}
//       {state.items.length > 0 && (
//         <div className="bg-muted/30 p-6 rounded-lg mt-6">
//           <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
//           <div className="space-y-2 mb-4">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Subtotal</span>
//               <span>Rs. {subtotal.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Tax (10%)</span>
//               <span>Rs. {tax.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Shipping</span>
//               <span>Rs. {shippingFee.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between font-medium">
//               <span>Total</span>
//               <span>Rs. {total.toLocaleString()}</span>
//             </div>
//           </div>
//           <Button className="w-full mt-4 bg-[#B88E2F] text-white" onClick={handleProceedToCheckout}>
//             Proceed to Checkout
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }
