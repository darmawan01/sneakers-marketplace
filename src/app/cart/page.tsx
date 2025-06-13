'use client'

import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import CheckoutModal from '@/components/CheckoutModal'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="relative w-24 h-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>

                <div className="flex items-center gap-4 mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="border border-gray-300 text-gray-900 cursor-pointer rounded-md px-2 py-1"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm h-fit text-gray-900">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Checkout
          </button>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
      />
    </div>
  )
} 