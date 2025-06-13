import ItemCard from '@/components/ItemCard';
import { categories, sneakers } from '@/data/sneakers';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Add artificial delay to see loading state
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay

  const { category } = await searchParams;
  const filteredSneakers = category && category !== 'All'
    ? sneakers.filter(sneaker => sneaker.category === category)
    : sneakers;

  return (
    <div className="space-y-8 min-h-screen py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className={cn(
                "px-4 py-2 rounded-full font-medium transition-colors",
                category === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              )}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSneakers.map((sneaker, index) => (
          <ItemCard key={sneaker.id} sneaker={sneaker} index={index} />
        ))}
      </div>
    </div>
  );
} 