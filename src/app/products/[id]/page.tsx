import { sneakers } from '@/data/sneakers';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Simulate server-side delay for loading skeleton
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { id } = await params;
  const sneaker = sneakers.find((s) => s.id === id);

  if (!sneaker) {
    notFound();
  }

  return <ProductDetailClient sneaker={sneaker} />;
} 