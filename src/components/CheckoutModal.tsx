import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

export default function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirming'>('details')
  const clearCart = useCartStore((state) => state.clearCart)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('confirming')
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart and close modal after successful payment
    clearCart()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 text-gray-900">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {step === 'details' && (
          <form onSubmit={() => setStep('payment')} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                required
                className={cn(
                  "w-full border rounded-md p-2",
                  "focus:outline-none focus:ring-2 focus:ring-black/20"
                )}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                required
                className={cn(
                  "w-full border rounded-md p-2",
                  "focus:outline-none focus:ring-2 focus:ring-black/20"
                )}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                required
                className={cn(
                  "w-full border rounded-md p-2",
                  "focus:outline-none focus:ring-2 focus:ring-black/20"
                )}
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className={cn(
                "w-full bg-black text-white py-2 rounded-md",
                "hover:bg-gray-800 transition-colors"
              )}
            >
              Continue to Payment
            </button>
          </form>
        )}

        {step === 'payment' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                className={cn(
                  "w-full border rounded-md p-2",
                  "focus:outline-none focus:ring-2 focus:ring-black/20"
                )}
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cardholder Name</label>
              <input
                type="text"
                required
                className={cn(
                  "w-full border rounded-md p-2",
                  "focus:outline-none focus:ring-2 focus:ring-black/20"
                )}
                value={formData.cardName}
                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  className={cn(
                    "w-full border rounded-md p-2",
                    "focus:outline-none focus:ring-2 focus:ring-black/20"
                  )}
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  className={cn(
                    "w-full border rounded-md p-2",
                    "focus:outline-none focus:ring-2 focus:ring-black/20"
                  )}
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className={cn(
                  "w-full bg-black text-white py-2 rounded-md",
                  "hover:bg-gray-800 transition-colors"
                )}
              >
                Pay Now
              </button>
            </div>
          </form>
        )}

        {step === 'confirming' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-lg">Processing your payment...</p>
          </div>
        )}
      </div>
    </div>
  )
} 