'use client'

import Link from "next/link"
import { useCart } from "@/components/CartProvider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const { state } = useCart()

  // Calculate totals dynamically
  const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const taxRate = 0.1 // 10% tax
  const shippingFee = 1500 // Flat rate shipping
  const tax = subtotal * taxRate
  const total = subtotal + tax + shippingFee

  return (
    <div className="min-h-screen bg-white">
    
      

      {/* Page Title */}
      <div className="bg-[#F9F1E7] py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="text-gray-600">Home</Link>
            <span className="text-gray-400">/</span>
            <span>Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Billing details</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input id="company" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country / Region</Label>
                <Select defaultValue="sri-lanka">
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="pakistan">Pakistan</SelectItem>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F9F1E7] p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-4">
              {/* Dynamically list cart items */}
              {state.items.length > 0 ? (
                state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      <span className="text-gray-500">x {item.quantity}</span>
                    </div>
                    <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
              )}

              {/* Subtotal */}
              <div className="flex justify-between items-center pb-4 border-b">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>

              {/* Tax */}
              <div className="flex justify-between items-center pb-4 border-b">
                <span>Tax (10%)</span>
                <span>Rs. {tax.toLocaleString()}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center pb-4 border-b">
                <span>Shipping</span>
                <span>Rs. {shippingFee.toLocaleString()}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pb-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#B88E2F]">Rs. {total.toLocaleString()}</span>
              </div>

              {/* Payment Methods */}
              <div className="pt-4">
                <RadioGroup defaultValue="bank-transfer">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer">Direct Bank Transfer</Label>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 pl-6">
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                  </div>
                </RadioGroup>
              </div>

              {/* Place Order Button */}
              <button className="w-full bg-[#B88E2F] text-white py-4 rounded-lg mt-8 hover:bg-[#9A7625] transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
