import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PlusCircle, Image as ImageIcon, Tag, DollarSign, Calendar, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();

  // Form Field State
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState("electronics");
  const [imageUrl, setImageUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !shortDescription.trim() || !fullDescription.trim() || !price) {
      setError('Please fill in all required form fields.');
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      setError('Please enter a valid price amount.');
      return;
    }

    setIsSubmitting(true);

    const defaultImages: { [key: string]: string } = {
      electronics: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
      jewelery: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      "men's clothing": 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
      "women's clothing": 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    };

    const finalImage = imageUrl.trim() || defaultImages[category] || defaultImages.electronics;

    const newProduct = {
      id: Date.now(),
      title: title.trim(),
      price: parseFloat(price),
      description: fullDescription.trim(),
      shortDescription: shortDescription.trim(),
      category: category,
      image: finalImage,
      rating: {
        rate: 4.8,
        count: 1
      },
      sku: 'ZEN-' + Math.floor(1000 + Math.random() * 9000),
      priority,
      date
    };

    // 1. Post to backend API
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
    } catch (err) {
      console.warn('Backend server offline, saving product to localStorage', err);
    }

    // 2. Save product locally to localStorage so Manage Items & Explore page pick it up instantly
    try {
      const existingRaw = localStorage.getItem('custom_products');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem('custom_products', JSON.stringify([newProduct, ...existing]));
    } catch (e) {
      console.error('Failed to save product to localStorage:', e);
    }

    setIsSubmitting(false);
    showToast(`Product "${title}" successfully added to inventory!`);
    navigate('/items/manage');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-3xl space-y-8">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Protected Admin Area</span>
          </div>
        </div>

        {/* Form Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl space-y-8"
        >
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md">
                <PlusCircle className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Add New Item / Listing
                </h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Publish a new product item into the ZenithStore catalog inventory.
                </p>
              </div>
            </div>
          </div>

          {/* Validation Error Alert */}
          {error && (
            <div className="flex items-center space-x-2 rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/40 p-4 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Main Add Item Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Field 1: Title */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Item Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Zenith Pro Wireless Noise-Canceling Headphones"
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            {/* Field 2: Short Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="e.g. Premium active noise cancellation with 40-hour battery life."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            {/* Field 3: Full Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Full Detailed Overview <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Provide complete product specifications, warranty info, and highlights..."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            {/* 3-Column Grid for Price, Date & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Field 4: Price */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Price ($ USD) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <DollarSign className="h-4 w-4" />
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="199.99"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>
              </div>

              {/* Field 5: Listing Date */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Listing Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>
              </div>

              {/* Field 6: Priority Level */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

            </div>

            {/* 2-Column Grid for Category & Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Field 7: Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Department Category
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Tag className="h-4 w-4" />
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  >
                    <option value="electronics">Electronics & Audio</option>
                    <option value="jewelery">Jewelry & Accessories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                </div>
              </div>

              {/* Field 8: Optional Image URL */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Optional Image URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <ImageIcon className="h-4 w-4" />
                  </span>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-1505740420928..."
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>
              </div>

            </div>

            {/* Image Thumbnail Preview if URL Provided */}
            {imageUrl.trim() && (
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center space-x-4">
                <img
                  src={imageUrl}
                  alt="Thumbnail Preview"
                  className="h-16 w-16 rounded-xl object-contain bg-white p-1 border shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Image Thumbnail Preview</p>
                  <p className="text-[10px] text-slate-400 truncate max-w-sm">{imageUrl}</p>
                </div>
              </div>
            )}

            {/* Form Submit Action Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/items/manage')}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 px-6 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 px-8 py-3.5 text-xs font-extrabold text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    <span>Publish Item to Catalog</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
};
