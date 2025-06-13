'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    // In a real app, this would integrate with an authentication service
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Sign in with Google
          </button>
          <p className="text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              onClick={handleLogin}
              className="text-black hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full" />
          <div>
            <h2 className="text-xl font-medium">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Order History</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Order #12345</p>
                <p className="text-sm text-gray-600">March 15, 2024</p>
              </div>
              <span className="text-green-600">Delivered</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">Order #12344</p>
                <p className="text-sm text-gray-600">March 10, 2024</p>
              </div>
              <span className="text-green-600">Delivered</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
} 