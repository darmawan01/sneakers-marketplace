import ItemCard from '@/components/ItemCard';
import { ProductSlider } from "@/components/ProductSlider";
import { categories, sneakers } from "@/data/sneakers";
import Link from "next/link";

export default function Home() {
  const featuredSneakers = sneakers.filter(sneaker => sneaker.featured);
  const sneakersOverView = sneakers.slice(0, 5);

  return (
    <div className="space-y-12">
      {/* Hero Section with Slider */}
      <section className="relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white bg-black/30 p-8 rounded-xl backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4">Premium Sneakers</h1>
            <p className="text-xl mb-8">Discover the latest trends in sneaker fashion</p>
            <Link
              href="/products"
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors pointer-events-auto"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-900">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
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
