'use client';

import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cartStore';

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative p-2 text-gray-500 hover:text-gray-900">
      <ShoppingCartIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
          {count}
        </span>
      )}
    </Link>
  );
} 