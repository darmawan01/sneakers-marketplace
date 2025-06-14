'use client';

import Button from '@/components/forms/Button';
import FormGroup from '@/components/forms/FormGroup';
import { brands, categories, SneakerFormData } from '@/data/sneakers';
import { validateImageUrl } from '@/lib/utils';
import { useWatchlistStore } from '@/store/watchlistStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit, FaEye, FaSave } from 'react-icons/fa';

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
          >
            {/* Front Face - Form */}
            <motion.div
              className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <form className="h-full flex flex-col">
                <div className="space-y-4 flex-1">
                  <FormGroup label="Sneaker Name" htmlFor="name">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none text-black"
                    />
                  </FormGroup>
                  <FormGroup label="Brand" htmlFor="brand">
                    <select
                      name="brand"
                      id="brand"
                      required
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none bg-white text-black"
                    >
                      <option value="">Select a brand</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup label="Price" htmlFor="price">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none text-black"
                    />
                  </FormGroup>
                  <FormGroup label="Category" htmlFor="category">
                    <select
                      name="category"
                      id="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none bg-white text-black"
                    >
                      <option value="">Select a category</option>
                      {categories.filter(category => category !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup label="Image URL" htmlFor="imageUrl">
                    <div className="space-y-1">
                      <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        required
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className={`h-12 w-full rounded-md border ${urlError ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none text-black`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {urlError && (
                        <p className="text-sm text-red-500">{urlError}</p>
                      )}
                    </div>
                  </FormGroup>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="mt-4 flex items-center justify-center w-[85%]">
                    Save
                    <FaSave className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    onClick={handlePreview}
                    className="mt-4 flex items-center justify-center flex-1"
                    disabled={!!urlError}
                  >
                    <FaEye className="w-6 h-6" />
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Back Face - Preview */}
            <motion.div
              className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  {formData.imageUrl && !imageError && isFlipped ? (
                    <motion.div layoutId="sneaker-image" className="relative w-full aspect-[4/3] mb-4">
                      {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        </div>
                      )}
                      <Image
                        src={formData.imageUrl}
                        alt={formData.name || 'Sneaker preview'}
                        fill
                        className="object-cover rounded-lg"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        unoptimized
                      />
                    </motion.div>
                  ) : (
                    <motion.div layoutId="sneaker-image" className="w-full aspect-[4/3] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-400">
                        {imageError ? 'Failed to load image' : 'No image'}
                      </span>
                    </motion.div>
                  )}

                  <motion.h2 layoutId="sneaker-name" className="text-xl font-semibold text-gray-900 mb-2">
                    {formData.name || 'Sneaker Name'}
                  </motion.h2>

                  <motion.p layoutId="sneaker-brand" className="text-gray-600 mb-2">
                    {formData.brand || 'Brand'}
                  </motion.p>

                  <div className="flex items-center justify-between">
                    <motion.span layoutId="sneaker-price" className="text-2xl font-bold text-gray-600">
                      ${formData.price || '0'}
                    </motion.span>
                    {formData.category && (
                      <motion.span layoutId="sneaker-category" className="px-2 py-1 text-sm font-medium text-gray-600 bg-gray-200 rounded-full">
                        {formData.category}
                      </motion.span>
                    )}
                  </div>
                </div>

                <Button onClick={() => setIsFlipped(false)} className="flex items-center justify-center">
                  <FaEdit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 