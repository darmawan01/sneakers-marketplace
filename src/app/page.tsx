import ItemCard from '@/components/ItemCard';
import { ProductSlider } from "@/components/ProductSlider";
import { categories, sneakers } from "@/data/sneakers";
import Link from "next/link";

export default function Home() {
  const featuredSneakers = sneakers.filter(sneaker => sneaker.featured);
  const sneakersOverView = sneakers.slice(0, 5);

  return (
    <div className="space-y-12 px-2 sm:px-4 lg:px-8">
      {/* Hero Section with Slider */}
      <section className="relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-900 lg:text-white lg:bg-black/30 p-2 sm:p-8 rounded-lg sm:rounded-xl lg:backdrop-blur-sm w-[90vw] max-w-md mx-auto">
            <h1 className="text-lg sm:text-4xl font-bold mb-1 sm:mb-4">Premium Sneakers</h1>
            <p className="text-xs sm:text-xl mb-2 sm:mb-8">Discover the latest trends in sneaker fashion</p>
            <Link
              href="/products"
              className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition-colors pointer-events-auto text-sm sm:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <ProductSlider sneakers={sneakersOverView} />
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-gray-900">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="bg-gray-100 rounded-lg px-2 sm:px-4 md:px-6 py-4 text-center hover:bg-gray-200 transition-colors"
            >
              <h3 className="font-medium">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredSneakers.map((sneaker) => (
            <ItemCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </div>
      </section>
    </div>
  );
}
