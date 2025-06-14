"use client";
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaCartPlus, FaHeart, FaHome, FaShoppingBag, FaUser } from 'react-icons/fa';
import SearchBar from './SearchBar';
import { useWatchlistStore } from '@/store/watchlistStore';

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const watchlistItems = useWatchlistStore((state) => state.items);
  const watchlistCount = watchlistItems.length;

  const menuItems: MenuItem[] = [
    { href: '/', label: 'Home', icon: <FaHome className="h-5 w-5" /> },
    { href: '/products', label: 'Products', icon: <FaShoppingBag className="h-5 w-5" /> },
    { 
      href: '/cart', 
      label: 'Cart', 
      icon: <FaCartPlus className="h-5 w-5" />,
      count: count
    },
    { 
      href: '/watchlist', 
      label: 'Watchlist', 
      icon: <FaHeart className="h-5 w-5" />,
      count: watchlistCount
    },
    { href: '/profile', label: 'Profile', icon: <FaUser className="h-5 w-5" /> },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sm:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">SNEAKER</span>
          </Link>

          <div className="h-full flex items-center">
            <SearchBar />

            <button
              className="p-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div ref={menuRef} className="absolute right-2 top-17 bg-white shadow-md rounded-lg px-4 py-2 space-y-2 z-50 w-48">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 text-gray-900 py-2 relative hover:bg-gray-50 rounded-md px-2"
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.count && item.count > 0 && (
                <span className="absolute right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
} 