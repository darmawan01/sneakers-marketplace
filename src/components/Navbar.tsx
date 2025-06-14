'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import CartIcon from './CartIcon';
import SearchBar from './SearchBar';
import WatchlistIconCount from './WatchlistIconCount';
import NavMenu from './NavMenu';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">SNEAKER</span>
            </Link>
            <NavMenu />
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar />
            <CartIcon />
            <WatchlistIconCount />
            <Link href="/profile" className="p-2 text-gray-500 hover:text-gray-900">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}