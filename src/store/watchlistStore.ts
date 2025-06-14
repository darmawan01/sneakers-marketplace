import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

interface WatchlistStore {
  items: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (itemId: string) => void;
  isInWatchlist: (itemId: string) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWatchlist: (item) => {
        const currentItems = get().items;
        if (!currentItems.find((i) => i.id === item.id)) {
          set({ items: [...currentItems, item] });
        }
      },
      removeFromWatchlist: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },
      isInWatchlist: (itemId) => {
        return get().items.some((item) => item.id === itemId);
      },
    }),
    {
      name: 'watchlist-storage',
    }
  )
); 