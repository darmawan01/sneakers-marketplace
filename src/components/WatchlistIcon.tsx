import { useWatchlistStore } from '@/store/watchlistStore';
import { HeartIcon } from '@heroicons/react/24/outline';

interface WatchlistIconProps {
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemImage: string;
  itemCategory: string;
  itemBrand: string;
  className?: string;
}

export default function WatchlistIcon({
  itemId,
  itemName,
  itemPrice,
  itemImage,
  itemCategory,
  itemBrand,
  className = '',
}: WatchlistIconProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist(itemId)) {
      removeFromWatchlist(itemId);
    } else {
      addToWatchlist({
        id: itemId,
        name: itemName,
        price: itemPrice,
        image: itemImage,
        category: itemCategory,
        brand: itemBrand,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      aria-label={isInWatchlist(itemId) ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <HeartIcon
        className={`w-5 h-5 ${
          isInWatchlist(itemId) ? 'fill-red-500 text-red-500' : 'text-gray-400'
        }`}
      />
    </button>
  );
} 