import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirming'>('details')
  const clearCart = useCartStore((state) => state.clearCart)
  const { isAuthenticated, login } = useAuthStore()
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] text-gray-900"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {!isAuthenticated ? (
            <motion.div 
              className="bg-white rounded-lg p-6 w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Sign In Required</h2>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>
              <p className="text-gray-600 mb-6">
                Please sign in to complete your purchase. This helps us keep track of your orders and provide better service.
              </p>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    login({
                      id: '1',
                      name: 'John Doe',
                      email: 'john.doe@example.com'
                    })
                  }}
                  className={cn(
                    "w-full bg-black text-white py-2 rounded-md",
                    "hover:bg-gray-800 transition-colors"
                  )}
                >
                  Sign in with Google
                </motion.button>
                <Link
                  href="/profile"
                  className={cn(
                    "block w-full text-center border border-black py-2 rounded-md",
                    "hover:bg-gray-50 transition-colors"
                  )}
                >
                  Go to Profile
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-lg p-6 w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {step === 'details' && (
                  <motion.form 
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep('payment');
                    }} 
                    className="space-y-4"
                  >
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={cn(
                        "w-full bg-black text-white py-2 rounded-md",
                        "hover:bg-gray-800 transition-colors cursor-pointer"
                      )}
                    >
                      Continue to Payment
                    </motion.button>
                  </motion.form>
                )}

                {step === 'payment' && (
                  <motion.form 
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
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
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={cn(
                          "w-full bg-black text-white py-2 rounded-md",
                          "hover:bg-gray-800 transition-colors cursor-pointer"
                        )}
                      >
                        Pay Now
                      </motion.button>
                    </div>
                  </motion.form>
                )}

                {step === 'confirming' && (
                  <motion.div 
                    key="confirming"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"
                    />
                    <p className="text-lg">Processing your payment...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 