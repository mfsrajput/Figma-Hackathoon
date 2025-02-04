'use client'

import { useCart } from "@/components/CartProvider"
import { Button } from "@/components/ui/button"

export default function CartTotals() {
  const { state } = useCart()

  // Subtotal calculation
  const subtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // Example of a fixed tax rate and shipping fee
  const taxRate = 0.1 // 10%
  const shippingFee = 1500 // Flat shipping fee

  // Calculate tax and total with shipping
  const tax = subtotal * taxRate
  const total = subtotal + tax + shippingFee

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
      <Button className="w-full">Check Out</Button>
    </div>
  )
}
