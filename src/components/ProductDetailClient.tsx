'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';
import type { Sneaker } from '@/data/sneakers';

export default function ProductDetailClient({ sneaker }: { sneaker: Sneaker }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <motion.div 
        variants={itemVariants}
        className="relative h-[500px] rounded-lg overflow-hidden"
      >
        <Image
          src={sneaker.image}
          alt={sneaker.name}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-2">{sneaker.name}</h1>
          <p className="text-xl text-gray-600">{sneaker.brand}</p>
        </motion.div>

        <motion.p variants={itemVariants} className="text-2xl font-bold">
          ${sneaker.price}
        </motion.p>

        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-medium mb-2">Description</h2>
          <p className="text-gray-600">{sneaker.description}</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-medium mb-2">Colors</h2>
          <div className="flex gap-2">
            {sneaker.colors.map((color: string) => (
              <motion.div
                key={color}
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AddToCartButton sneaker={sneaker} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 