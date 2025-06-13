'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchStore } from '@/store/searchStore';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, filteredSneakers } = useSearchStore();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSearchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-64 px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Search Results Popup */}
      {searchQuery && filteredSneakers.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          <div className="p-2">
            {filteredSneakers.map((sneaker) => (
              <Link
                key={sneaker.id}
                href={`/products/${sneaker.id}`}
                className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setSearchQuery('')}
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={sneaker.image}
                    alt={sneaker.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{sneaker.name}</h3>
                  <p className="text-sm text-gray-500">{sneaker.brand}</p>
                  <p className="text-sm font-medium text-gray-900">${sneaker.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {searchQuery && filteredSneakers.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <p className="text-gray-500 text-center">No products found</p>
        </div>
      )}
    </div>
  );
} 