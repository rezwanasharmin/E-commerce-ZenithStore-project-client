import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  sku?: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const navigate = useNavigate();

  const renderStars = (ratingValue: number) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalf = ratingValue - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative shrink-0">
            <Star className="h-4 w-4 text-slate-200 dark:text-slate-700" />
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-slate-200 dark:text-slate-700 shrink-0" />
        );
      }
    }
    return stars;
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-2xl hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-white p-6 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Quick action hover overlay */}
        <div className="absolute inset-0 bg-slate-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickViewClick}
            className="flex items-center space-x-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 dark:text-white backdrop-blur-md px-4 py-2.5 text-xs font-bold text-slate-900 shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Eye className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            <span>Quick View</span>
          </motion.button>
        </div>
      </div>

      {/* Info Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold tracking-wider text-primary-600 dark:text-primary-400 uppercase">
              {product.category}
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
              In Stock
            </span>
          </div>
          
          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 min-h-[40px] hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Rating & Meta Row */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {renderStars(product.rating?.rate || 0)}
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 ml-1">
                {product.rating?.rate || 4.8} ({product.rating?.count || 0})
              </span>
            </div>
          </div>
        </div>

        {/* Purchase Info Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800 transition-colors duration-200"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};


