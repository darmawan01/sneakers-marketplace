'use client';

import { Sneaker } from "@/data/sneakers";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import WatchlistIcon from "./WatchlistIcon";

interface ItemCardProps {
  sneaker: Sneaker;
  index?: number;
}

export default function ItemCard({ sneaker, index = 0 }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/products/${sneaker.id}`}
        className="group block"
      >
        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative h-64">
            <Image
              src={sneaker.image}
              alt={sneaker.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 z-10">
              <WatchlistIcon
                itemId={sneaker.id}
                itemName={sneaker.name}
                itemPrice={sneaker.price}
                itemImage={sneaker.image}
                className="bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{sneaker.name}</h3>
              <p className="text-gray-700 font-semibold mb-2">{sneaker.brand}</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <p className="font-bold text-gray-900">${sneaker.price}</p>
              <span className="text-sm text-gray-700">{sneaker.category}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}