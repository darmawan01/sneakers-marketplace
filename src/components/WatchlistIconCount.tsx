'use client';

import { useWatchlistStore } from '@/store/watchlistStore';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function WatchlistIconCount() {
  const items = useWatchlistStore((state) => state.items);
  const count = items.length;

  return (
    <Link href="/watchlist" className="relative p-2 text-gray-500 hover:text-gray-900">
      <HeartIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
          {count}
        </span>
      )}
    </Link>
  );
} 