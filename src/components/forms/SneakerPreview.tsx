import { SneakerFormData } from '@/data/sneakers';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import Button from './Button';

interface SneakerPreviewProps {
  formData: SneakerFormData;
  imageError: boolean;
  isImageLoading: boolean;
  onEdit: () => void;
  onImageError: () => void;
  onImageLoad: () => void;
}

export default function SneakerPreview({
  formData,
  imageError,
  isImageLoading,
  onEdit,
  onImageError,
  onImageLoad,
}: SneakerPreviewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {formData.imageUrl && !imageError ? (
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
              onError={onImageError}
              onLoad={onImageLoad}
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

      <Button onClick={onEdit} className="flex items-center justify-center">
        <FaEdit className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </div>
  );
} 