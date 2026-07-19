import React, { useState } from 'react';
import { X, Star, ShoppingBag, Sparkles, Check, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from './ProductCard';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('Obsidian Black');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const colors = ['Obsidian Black', 'Silver Alloy', 'Nordic Blue'];
  const sizes = ['S', 'M', 'L', 'Standard'];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderStars = (ratingValue: number) => {
    const fullStars = Math.floor(ratingValue);
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < fullStars ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
        }`}
      />
    ));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Product Image Area */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={product.image}
                alt={product.title}
                className="max-h-64 object-contain transition-transform hover:scale-105"
              />
              <div className="mt-6 flex items-center space-x-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="h-4 w-4 text-accent-emerald" />
                  <span>2 Year Warranty</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Truck className="h-4 w-4 text-primary-500" />
                  <span>Fast Shipping</span>
                </span>
              </div>
            </div>

            {/* Details Area */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <span className="inline-block rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-100 dark:border-primary-800/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2">
                  {product.category}
                </span>
                
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {product.title}
                </h2>

                <div className="mt-2 flex items-center space-x-2">
                  <div className="flex items-center">{renderStars(product.rating?.rate || 0)}</div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {product.rating?.rate || 4.8} ({product.rating?.count || 120} reviews)
                  </span>
                </div>

                <div className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </div>

                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                {/* AI Summary Highlight Box */}
                <div className="mt-4 rounded-xl bg-gradient-to-r from-primary-50/60 to-indigo-50/60 dark:from-slate-800/60 dark:to-slate-800/40 p-3.5 border border-primary-100/60 dark:border-slate-700/60">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-primary-700 dark:text-primary-300 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary-500 animate-pulse" />
                    <span>Zenith AI Highlight</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                    Highly rated for build durability, ergonomic design, and top-tier consumer satisfaction score (98%).
                  </p>
                </div>
              </div>

              {/* Color & Size Variant Selectors */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                    Color: <span className="font-normal text-slate-500">{selectedColor}</span>
                  </label>
                  <div className="flex space-x-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold border transition-all ${
                          selectedColor === color
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                    Size / Fit:
                  </label>
                  <div className="flex space-x-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold border transition-all ${
                          selectedSize === size
                            ? 'border-slate-900 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-4 flex items-center space-x-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                {/* Quantity Control */}
                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-1 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-1 font-bold"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-3 text-sm font-bold shadow-lg transition-all ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
