'use client';

import ItemCard from '@/components/ItemCard';
import { useWatchlistStore } from '@/store/watchlistStore';
import { motion } from 'framer-motion';

export default function WatchlistPage() {
  const { items } = useWatchlistStore();

  const watchlistSneakers = items.map(item => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      brand: item.brand,
      category: item.category,
      colors: [],
      description: '',
      sizes: [],
      releaseDate: '',
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 text-lg">Your watchlist is empty</p>
          <p className="text-gray-500 mt-2">
            Add items to your watchlist by clicking the heart icon on any product
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlistSneakers.map((sneaker, index) => (
            <ItemCard
              key={sneaker.id}
              sneaker={sneaker}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
} 