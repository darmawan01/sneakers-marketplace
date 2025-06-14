'use client';

import { SneakerFormData } from '@/data/sneakers';
import { validateImageUrl } from '@/lib/utils';
import { useWatchlistStore } from '@/store/watchlistStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SneakerForm from '@/components/forms/SneakerForm';
import SneakerPreview from '@/components/forms/SneakerPreview';

const initialFormData: SneakerFormData = {
  name: '',
  brand: '',
  price: 0,
  category: '',
  imageUrl: '',
};

export default function NewListingPage() {
  const [formData, setFormData] = useState<SneakerFormData>(initialFormData);
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  const router = useRouter();
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'imageUrl') {
      setImageError(false);
      setIsImageLoading(false);
      if (value && !validateImageUrl(value)) {
        setUrlError('Please enter a valid image URL');
      } else {
        setUrlError('');
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSave = () => {
    addToWatchlist({
      id: formData.name,
      image: formData.imageUrl,
      name: formData.name,
      price: formData.price,
      category: formData.category,
      brand: formData.brand,
    });

    router.push('/watchlist');
  };

  const handlePreview = () => {
    if (formData.imageUrl && !validateImageUrl(formData.imageUrl)) {
      setUrlError('Please enter a valid image URL');
      return;
    }
    setIsImageLoading(true);
    setIsFlipped(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setUrlError('Failed to load image.');
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-[400px]">
        <h1 className="text-3xl font-bold mb-8">New Sneaker Listing</h1>

        <div className="relative w-full h-[570px] perspective-1000">
          <motion.div
            className="w-full h-full relative preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: isFlipped 
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Front Face - Form */}
            <motion.div
              className="absolute w-full h-full backface-hidden bg-white rounded-xl p-6"
              style={{ 
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <SneakerForm
                formData={formData}
                urlError={urlError}
                onInputChange={handleInputChange}
                onSave={handleSave}
                onPreview={handlePreview}
              />
            </motion.div>

            {/* Back Face - Preview */}
            <motion.div
              className="absolute w-full h-full backface-hidden bg-white rounded-xl p-6"
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <SneakerPreview
                formData={formData}
                imageError={imageError}
                isImageLoading={isImageLoading}
                onEdit={() => setIsFlipped(false)}
                onImageError={handleImageError}
                onImageLoad={handleImageLoad}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 