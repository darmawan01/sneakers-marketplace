import { SneakerFormData } from '@/data/sneakers';
import { motion, AnimatePresence, Variants } from 'framer-motion';
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    rotateY: 90,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

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
        <AnimatePresence mode="wait">
          {formData.imageUrl && !imageError ? (
            <motion.div
              key="image"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative h-64 mb-4 aspect-[4/3] shadow-lg rounded-lg overflow-hidden"
            >
              {isImageLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                </motion.div>
              )}
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                className="w-full h-full overflow-hidden rounded-lg"
              >
                <Image
                  src={formData.imageUrl}
                  alt={formData.name || 'Sneaker preview'}
                  fill
                  className="object-cover transition-transform duration-300"
                  onError={onImageError}
                  onLoad={onImageLoad}
                  unoptimized
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
            >
              <span className="text-gray-400">
                {imageError ? 'Failed to load image' : 'No image'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="p-4 flex flex-col flex-1 justify-between"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h2
              layoutId="sneaker-name"
              className="font-semibold text-lg text-gray-900 mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formData.name || 'Sneaker Name'}
            </motion.h2>
            <motion.p
              layoutId="sneaker-brand"
              className="text-gray-700 font-semibold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {formData.brand || 'Brand'}
            </motion.p>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <motion.span
              layoutId="sneaker-price"
              className="font-bold text-gray-900"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
            >
              ${formData.price || '0'}
            </motion.span>
            {formData.category && (
              <motion.span
                layoutId="sneaker-category"
                className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {formData.category}
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Button onClick={onEdit} className="flex items-center justify-center">
          <FaEdit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </motion.div>
    </div>
  );
} 