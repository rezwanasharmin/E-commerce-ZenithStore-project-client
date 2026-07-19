import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ProductCard } from './ProductCard';
import type { Product } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { AlertCircle, RotateCcw, Search, SlidersHorizontal, Sparkles, X, ChevronLeft, ChevronRight, DollarSign, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search, Filter, Sort & Pagination State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const ITEMS_PER_PAGE = 8;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let combinedProducts: Product[] = [];

      // 1. Read custom products
      try {
        const customRaw = localStorage.getItem('custom_products');
        if (customRaw) {
          const parsed = JSON.parse(customRaw);
          if (Array.isArray(parsed)) {
            combinedProducts = [...parsed];
          }
        }
      } catch (e) {
        console.error('Error reading custom products:', e);
      }

      // 2. Fetch API products
      try {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        if (Array.isArray(response.data)) {
          response.data.forEach((apiProd) => {
            if (!combinedProducts.some((p) => p.id === apiProd.id)) {
              combinedProducts.push(apiProd);
            }
          });
        }
      } catch (err) {
        console.warn('API error, relying on local custom items:', err);
      }

      // 3. Filter out deleted products
      try {
        const deletedRaw = localStorage.getItem('deleted_product_ids');
        if (deletedRaw) {
          const deletedIds: (string | number)[] = JSON.parse(deletedRaw);
          combinedProducts = combinedProducts.filter((p) => !deletedIds.includes(p.id));
        }
      } catch (e) {
        console.error('Error reading deleted products:', e);
      }

      setProducts(combinedProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Could not fetch products. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Electronics & Audio', value: 'electronics' },
    { label: 'Jewelry', value: 'jewelery' },
    { label: "Men's Apparel", value: "men's clothing" },
    { label: "Women's Fashion", value: "women's clothing" },
  ];

  // Filtered and Sorted Products computation (Multi-field filtering)
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Field 1: Live Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Field 2: Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Field 3: Price Range Filter
    if (priceFilter === 'under-50') {
      list = list.filter((p) => p.price < 50);
    } else if (priceFilter === '50-100') {
      list = list.filter((p) => p.price >= 50 && p.price <= 100);
    } else if (priceFilter === 'over-100') {
      list = list.filter((p) => p.price > 100);
    }

    // Field 4: Minimum Rating Filter
    if (ratingFilter === '4-above') {
      list = list.filter((p) => (p.rating?.rate || 0) >= 4.0);
    } else if (ratingFilter === '3-above') {
      list = list.filter((p) => (p.rating?.rate || 0) >= 3.0);
    }

    // Sort Options
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return list;
  }, [products, searchQuery, selectedCategory, priceFilter, ratingFilter, sortBy]);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceFilter, ratingFilter, sortBy]);

  // Pagination Slice Calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceFilter('all');
    setRatingFilter('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <section id="featured-products" className="py-20 sm:py-28 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-100 dark:border-primary-800/60 px-4 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-primary-500 animate-pulse" />
            <span>Explore Catalog</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Featured Product Catalog
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-base">
            Search, multi-field filter by category, price, and rating, or sort items.
          </p>
        </motion.div>

        {/* Search, Multi-Field Filters & Sort Bar */}
        <div className="mb-10 space-y-4 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 shadow-sm">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Live Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or category..."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-11 pr-10 py-3 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Control Dropdown */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              <div className="flex items-center space-x-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 shadow-sm">
                <SlidersHorizontal className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="dark:bg-slate-800">Featured</option>
                  <option value="price-low" className="dark:bg-slate-800">Price: Low to High</option>
                  <option value="price-high" className="dark:bg-slate-800">Price: High to Low</option>
                  <option value="rating" className="dark:bg-slate-800">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Multi-Field Filters Row (Category, Price Range, Minimum Rating) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
            
            {/* Field 1: Category Filter Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Field 2: Price Range Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <DollarSign className="h-3 w-3" />
                <span>Price Range</span>
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="under-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="over-100">Over $100</option>
              </select>
            </div>

            {/* Field 3: Minimum Rating Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>Minimum Rating</span>
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
              >
                <option value="all">All Ratings</option>
                <option value="4-above">4.0 ★ & Above</option>
                <option value="3-above">3.0 ★ & Above</option>
              </select>
            </div>

          </div>

          {/* Active Filter Badges & Reset Trigger */}
          {(selectedCategory !== 'all' || priceFilter !== 'all' || ratingFilter !== 'all' || searchQuery !== '') && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-500">
                Found <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> matching item(s)
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* Loading Skeleton Loader */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-4">
                <div className="aspect-square w-full animate-shimmer rounded-xl"></div>
                <div className="h-4 w-1/4 animate-shimmer rounded-md"></div>
                <div className="h-5 w-3/4 animate-shimmer rounded-md"></div>
                <div className="h-4 w-1/2 animate-shimmer rounded-md"></div>
                <div className="flex justify-between items-center pt-4">
                  <div className="h-6 w-1/3 animate-shimmer rounded-md"></div>
                  <div className="h-8 w-1/3 animate-shimmer rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Handling */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md rounded-2xl border border-rose-100 bg-rose-50/50 p-8 text-center shadow-sm"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-accent-rose">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-800">Connection Error</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {error}
            </p>
            <button
              onClick={fetchProducts}
              className="mt-6 inline-flex items-center space-x-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          </motion.div>
        )}

        {/* Empty State when Search/Filter returns no items */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-12 text-center my-8">
            <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No products match your search</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your query or resetting filters to view all products.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Grid (4 Cards Per Row on Desktop) */}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Showing Page <span className="text-slate-900 dark:text-white font-bold">{currentPage}</span> of{' '}
                  <span className="text-slate-900 dark:text-white font-bold">{totalPages}</span> ({filteredProducts.length} items)
                </p>

                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="flex items-center space-x-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>

                  {/* Numbered Page Buttons */}
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 w-8 rounded-xl text-xs font-extrabold transition-all ${
                          currentPage === pageNum
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="flex items-center space-x-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* Quick View Backdrop Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};
