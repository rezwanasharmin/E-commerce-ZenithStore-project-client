import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import type { Product } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Eye, Trash2, Search, ArrowLeft, ShieldCheck, AlertCircle, RefreshCw, Star, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ManageItems: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteModalProduct, setDeleteModalProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let combinedProducts: Product[] = [];

      // 1. Read custom products added by user in current/past sessions
      try {
        const customRaw = localStorage.getItem('custom_products');
        if (customRaw) {
          const parsedCustom = JSON.parse(customRaw);
          if (Array.isArray(parsedCustom)) {
            combinedProducts = [...parsedCustom];
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
        console.warn('Fakestore API offline, relying on custom inventory:', err);
      }

      // 3. Filter out deleted products
      try {
        const deletedRaw = localStorage.getItem('deleted_product_ids');
        if (deletedRaw) {
          const deletedIds: (string | number)[] = JSON.parse(deletedRaw);
          combinedProducts = combinedProducts.filter((p) => !deletedIds.includes(p.id));
        }
      } catch (e) {
        console.error('Error reading deleted product IDs:', e);
      }

      setProducts(combinedProducts);
    } catch (err) {
      console.error('Error fetching inventory items:', err);
      setError('Failed to load inventory list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteConfirm = () => {
    if (!deleteModalProduct) return;

    const targetId = deleteModalProduct.id;

    // 1. Remove from state
    setProducts((prev) => prev.filter((p) => p.id !== targetId));

    // 2. Remove from custom_products localStorage if custom
    try {
      const customRaw = localStorage.getItem('custom_products');
      if (customRaw) {
        const parsedCustom: Product[] = JSON.parse(customRaw);
        const updatedCustom = parsedCustom.filter((p) => p.id !== targetId);
        localStorage.setItem('custom_products', JSON.stringify(updatedCustom));
      }
    } catch (e) {
      console.error('Failed removing item from custom_products:', e);
    }

    // 3. Persist deleted ID in deleted_product_ids
    try {
      const deletedRaw = localStorage.getItem('deleted_product_ids');
      const deletedIds: (string | number)[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deletedIds.includes(targetId)) {
        localStorage.setItem('deleted_product_ids', JSON.stringify([...deletedIds, targetId]));
      }
    } catch (e) {
      console.error('Failed storing deleted_product_ids:', e);
    }

    showToast(`Product "${deleteModalProduct.title}" deleted from catalog.`);
    setDeleteModalProduct(null);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Manage Inventory Items
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              View, edit, or delete items in the store catalog.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 px-4 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Protected Admin Area</span>
            </div>
            <Link
              to="/items/add"
              className="rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-4 py-2 text-xs font-extrabold text-white shadow-md hover:bg-slate-800 transition-all"
            >
              + Add New Item
            </Link>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title or category..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
          </div>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Inventory: <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> items
          </span>
        </div>

        {/* Loading Skeleton State */}
        {loading && (
          <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4">
            <RefreshCw className="mx-auto h-8 w-8 text-primary-500 animate-spin" />
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Loading catalog inventory...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-3xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/50 p-6 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-rose-500 mb-2" />
            <p className="text-xs font-bold text-rose-700">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm"
            >
              Retry Loading
            </button>
          </div>
        )}

        {/* Inventory Table Layout */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {/* Title & Image */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-10 w-10 rounded-xl object-contain bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                          />
                          <div className="max-w-xs sm:max-w-md">
                            <span className="font-extrabold text-slate-900 dark:text-white line-clamp-1">
                              {product.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              SKU: {product.sku || `ZEN-${product.id}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center space-x-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 capitalize">
                          <Tag className="h-3 w-3 text-slate-400" />
                          <span>{product.category}</span>
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 font-extrabold text-slate-900 dark:text-white text-sm">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {product.rating?.rate || 4.5}
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            ({product.rating?.count || 12})
                          </span>
                        </div>
                      </td>

                      {/* Actions: View & Delete */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="inline-flex items-center space-x-1 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Link>

                          <button
                            onClick={() => setDeleteModalProduct(product)}
                            className="inline-flex items-center space-x-1 rounded-xl bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal Backdrop */}
        <AnimatePresence>
          {deleteModalProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md w-full rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center shadow-2xl space-y-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-500">
                  <Trash2 className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Delete Item Confirmation</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-white">"{deleteModalProduct.title}"</span> from inventory? This action cannot be undone.
                  </p>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setDeleteModalProduct(null)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 rounded-xl bg-rose-600 text-white py-2.5 text-xs font-extrabold shadow-md hover:bg-rose-700 transition-colors"
                  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
