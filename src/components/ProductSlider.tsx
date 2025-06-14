'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Sneaker {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

interface ProductSliderProps {
  sneakers: Sneaker[];
}

export function ProductSlider({ sneakers }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => 
        prevIndex === sneakers.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [sneakers.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const slideTransition: Transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[400px] bg-gray-100 rounded-xl overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="absolute w-full h-full"
        >
          <Link href={`/products/${sneakers[currentIndex].id}`} className="block w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={sneakers[currentIndex].image}
                alt={sneakers[currentIndex].name}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-6">
                <h2 className="text-white text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{sneakers[currentIndex].name}</h2>
                <p className="text-white/90 text-sm sm:text-base">{sneakers[currentIndex].brand} • ${sneakers[currentIndex].price}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {sneakers.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 