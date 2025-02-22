// src/components/CartTotals.tsx
'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { Button } from '@/components/ui/button'
import { clearCart } from '@/redux/slices/cartSlice'

export default function CartTotals() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const taxRate = 0.1 // 10%
  const shippingFee = 1500 // Flat shipping fee

  const tax = subtotal * taxRate
  const total = subtotal + tax + shippingFee

  const handleClearCart = () => {
    dispatch(clearCart()) // Dispatch clearCart action
  }

  return (
    <div className="bg-muted/30 p-6 rounded-lg">
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
      <Button className="w-full" onClick={handleClearCart}>
        Clear Cart
      </Button>
    </div>
  )
}




