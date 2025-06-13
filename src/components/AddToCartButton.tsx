'use client';

import { Sneaker } from '@/data/sneakers';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';

interface AddToCartButtonProps {
  sneaker: Sneaker;
}

export default function AddToCartButton({ sneaker }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isInCart, setIsInCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    if (selectedSize) {
      const itemId = `${sneaker.id}-${selectedSize}`;
      setIsInCart(items.some(item => item.id === itemId));
    }
  }, [selectedSize, items, sneaker.id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const itemId = `${sneaker.id}-${selectedSize}`;
    addItem({
      id: itemId,
      name: sneaker.name,
      price: sneaker.price,
      image: sneaker.image,
    });
  };

  const handleRemoveFromCart = () => {
    if (!selectedSize) return;
    const itemId = `${sneaker.id}-${selectedSize}`;
    removeItem(itemId);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium mb-2">Select Size</h2>
        <div className="flex flex-wrap gap-2">
          {sneaker.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'px-4 py-2 border rounded-md transition-colors cursor-pointer',
                selectedSize === size
                  ? 'border-gray-500 bg-gray-500 text-white'
                  : 'border-gray-300 hover:border-gray-500'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {isInCart ? (
        <button
          onClick={handleRemoveFromCart}
          className="w-full bg-red-600 border border-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full bg-black border border-white text-white py-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
} 