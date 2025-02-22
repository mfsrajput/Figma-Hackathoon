'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CheckoutForm from '@/components/CheckoutForm';
import { useEffect } from 'react';
import { setCartItems } from '@/redux/slices/cartSlice';
// import Checkout from '@/components/Checkout';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  useEffect(() => {
    // Fetch cart data from localStorage or an API if needed
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      dispatch(setCartItems(parsedCart)); // Update Redux state with stored cart
    }
  }, [dispatch]);
  useEffect(() => {
    // Sync cart state with localStorage
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]); // When cart updates, save to localStorage

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <CheckoutForm />
          
        </div>
        <div>
          <div className="border rounded p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-lg md:text-xl font-medium">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {/* Cart Items */}
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center text-gray-600 py-2 border-b"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      width={60}
                      height={60}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div>
                      <p>{product.name}</p>
                      <p className="text-sm">x {product.quantity}</p>
                    </div>
                  </div>
                  <span>Rs {product.price * product.quantity}</span>
                </div>
              ))}

              <div className="flex justify-between border-t pt-4">
                <span>Subtotal</span>
                <span>Rs {totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t pt-4">
                <span>Total</span>
                <span className="text-[#B88E2F] font-bold">
                  Rs {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




