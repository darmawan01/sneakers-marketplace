import { create } from 'zustand';
import { sneakers } from '@/data/sneakers';

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredSneakers: typeof sneakers;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => {
    const filtered = sneakers.filter(
      (sneaker) =>
        sneaker.name.toLowerCase().includes(query.toLowerCase()) ||
        sneaker.brand.toLowerCase().includes(query.toLowerCase())
    );
    set({ searchQuery: query, filteredSneakers: filtered });
  },
  filteredSneakers: [],
})); 