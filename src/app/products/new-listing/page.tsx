'use client';

import SneakerForm from '@/components/forms/SneakerForm';
import SneakerPreview from '@/components/forms/SneakerPreview';
import { SneakerFormData } from '@/data/sneakers';
import { validateImageUrl } from '@/lib/utils';
import { useWatchlistStore } from '@/store/watchlistStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

        <div className="relative w-full h-[570px]" style={{ perspective: '2000px' }}>
          <motion.div
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              marginTop: '20px',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '50px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.01) 100%)',
              filter: 'blur(2px)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          <div
            className="w-full h-full relative transition-all duration-700 ease-in-out"
            style={{
              transform: isFlipped ? 'rotateY(180deg) translateZ(20px)' : 'rotateY(0deg) translateZ(0)',
              transformStyle: 'preserve-3d',
            }}
          >
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="form"
                  initial={{
                    opacity: 0,
                    rotateY: 0,
                    z: 0,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    z: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    rotateY: -90,
                    z: -20,
                    scale: 0.95
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute w-full h-full bg-white rounded-xl p-6"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                    boxShadow: '8px 8px 6px -1px rgba(0,0,0,0.35), 0 2px 4px -1px rgba(0,0,0,0.35)',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
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
              ) : (
                <motion.div
                  key="preview"
                  initial={{
                    opacity: 0,
                    rotateY: 90,
                    z: 20,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 180,
                    z: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    rotateY: 270,
                    z: -20,
                    scale: 0.95
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute w-full h-full bg-white rounded-xl p-6"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                    boxShadow: '8px 8px 6px -1px rgba(0,0,0,0.35), 0 2px 4px -1px rgba(0,0,0,0.35)',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
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
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
} 