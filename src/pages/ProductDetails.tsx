import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import type { Product } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Star, ArrowLeft, ShieldAlert, Sparkles, Check, ThumbsUp, ShoppingCart, Info, Award, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Media Gallery Active View Index
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
        if (!response.data) {
          throw new Error('Product not found.');
        }
        setProduct(response.data);

        // Fetch related products from same category
        const allRes = await axios.get<Product[]>('https://fakestoreapi.com/products');
        const related = allRes.data
          .filter((item) => item.category === response.data.category && item.id !== response.data.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Unable to load product details. It may not exist or there is a network issue.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, 1);
      navigate('/checkout');
    }
  };

  const renderStars = (ratingValue: number) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalf = ratingValue - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />);
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
        stars.push(<Star key={i} className="h-4 w-4 text-slate-200 dark:text-slate-700 shrink-0" />);
      }
    }
    return stars;
  };

  const getAiSummary = (prod: Product) => {
    const isTech = prod.category === 'electronics';
    const isFashion = prod.category.includes('clothing');
    
    return {
      sentiment: prod.rating?.rate >= 4.0 ? 'Overwhelmingly Positive (92%)' : 'Favorable (84%)',
      pros: isTech
        ? ['Energy efficient design', 'Ergonomic form factor', 'High reliability score']
        : isFashion
        ? ['Hypoallergenic materials', 'Tailored comfort fit', 'Color-fast fabric lock']
        : ['Highly durable composition', 'Timeless aesthetics', 'Premium surface finish'],
      verdict: `Excellent value proposition. Recommended choice for users seeking ${prod.category} combining premium aesthetics and functionality.`,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-6">
            <div className="h-6 w-32 animate-shimmer rounded-md"></div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start mt-4">
              <div className="lg:col-span-6 aspect-square animate-shimmer rounded-2xl"></div>
              <div className="lg:col-span-6 space-y-5 mt-8 lg:mt-0">
                <div className="h-4 w-1/4 animate-shimmer rounded-md"></div>
                <div className="h-10 w-3/4 animate-shimmer rounded-md"></div>
                <div className="h-6 w-1/3 animate-shimmer rounded-md"></div>
                <div className="h-20 w-full animate-shimmer rounded-md"></div>
                <div className="h-12 w-1/2 animate-shimmer rounded-lg pt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-2xl border border-rose-100 bg-white dark:bg-slate-900 p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-accent-rose">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">Error Loading Product</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {error || 'The requested product could not be found.'}
          </p>
          <div className="mt-6 flex flex-col space-y-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const aiInsights = getAiSummary(product);

  // Simulated Multiple Media Gallery Angles
  const mediaGallery = [
    { id: 1, label: 'Primary View', url: product.image },
    { id: 2, label: 'Detail Angle', url: product.image },
    { id: 3, label: 'Packaging View', url: product.image },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Catalog</span>
          </Link>
        </div>

        {/* Top Product Specs & Media Gallery Panel */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            
            {/* Left: Multiple Images & Gallery Media Selector */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="flex justify-center bg-white p-8 sm:p-12 aspect-square relative rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={mediaGallery[activeImageIndex].url}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Multiple Images Thumbnails */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                {mediaGallery.map((media, idx) => (
                  <button
                    key={media.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-16 w-16 rounded-xl border p-2 bg-white flex items-center justify-center transition-all ${
                      activeImageIndex === idx
                        ? 'border-primary-500 ring-2 ring-primary-500/30 scale-105'
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={media.url} alt={media.label} className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Specifications & Buy CTA */}
            <div className="lg:col-span-6 mt-10 lg:mt-0 flex flex-col space-y-6">
              <div>
                <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-100 dark:border-primary-800/60 px-3 py-1 text-xs font-bold text-primary-700 dark:text-primary-300 capitalize mb-2">
                  {product.category}
                </span>
                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* Rating Section */}
              <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center">
                  {renderStars(product.rating?.rate || 0)}
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {product.rating?.rate?.toFixed(1) || '0.0'}
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {product.rating?.count || 0} customer reviews
                </span>
              </div>

              {/* Price Tag */}
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </div>

              {/* Short Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Buy Now Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:scale-[1.01]"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Buy Now (${product.price.toFixed(2)})</span>
                </button>
              </div>

              {/* AI Summary Card */}
              <div className="mt-6 rounded-2xl border border-primary-100/80 dark:border-slate-700 bg-primary-50/30 dark:bg-slate-800/90 p-5 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Product Summary</h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold tracking-wider uppercase">Generated by ZenithAI</p>
                  </div>
                </div>
                
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-4.5 w-4.5 text-primary-500 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Customer Sentiment: <span className="text-primary-600 dark:text-primary-400 font-bold">{aiInsights.sentiment}</span>
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-1.5">
                    {aiInsights.pros.map((pro, index) => (
                      <li key={index} className="flex items-start text-xs text-slate-600 dark:text-slate-300">
                        <Check className="h-4 w-4 text-accent-emerald mr-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed pt-2 border-t border-primary-100/60 dark:border-slate-700">
                    <span className="font-bold text-slate-800 dark:text-white">Verdict:</span> {aiInsights.verdict}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SEPARATE SECTIONS TABS & PANELS */}
        <div className="mt-12 space-y-8">
          
          {/* Section Selector Tabs */}
          <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Info className="h-4 w-4" />
              <span>Description / Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'specs'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Key Info / Specifications</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Reviews & Ratings ({product.rating?.count || 0})</span>
            </button>
          </div>

          {/* SECTION 1: Description / Overview */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Product Overview & Features</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description} Crafted with precision to provide superior performance and elegance. Ideal for everyday use with high quality standards certified for durability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Category</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white capitalize">{product.category}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Warranty</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">2 Years International</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Return Policy</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">30 Days Guarantee</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 2: Key Information / Specifications */}
          {activeTab === 'specs' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm"
            >
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6">Technical Specifications</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-3 font-semibold text-slate-400 w-1/3">Product ID / SKU</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">SKU-ZN-{product.id}</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-400">Material Composition</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">Premium Grade Alloy & Organic Fibers</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-400">Origin / Manufacturing</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">Imported Certified Assembly</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-400">Model Dimensions</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">Standard Ergonomic Fit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* SECTION 3: Reviews / Ratings */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Customer Reviews</h3>
                  <p className="text-xs text-slate-400">Based on {product.rating?.count || 120} verified purchases</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{product.rating?.rate || 4.8}</span>
                  <div className="flex items-center">
                    {renderStars(product.rating?.rate || 4.8)}
                  </div>
                </div>
              </div>

              {/* Sample Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center text-xs">
                        JD
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">John Doe</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Verified Buyer</span>
                  </div>
                  <div className="flex items-center">{renderStars(5)}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Outstanding product! The build quality and design exceeded my expectations. Fast delivery too.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-xs">
                        AS
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Alice Smith</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Verified Buyer</span>
                  </div>
                  <div className="flex items-center">{renderStars(4.5)}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Very comfortable and stylish. Color matches the pictures perfectly. Highly recommended!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 4: Related Items */}
          {relatedProducts.length > 0 && (
            <div className="pt-8">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
                Related Items / You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relItem) => (
                  <motion.div
                    key={relItem.id}
                    whileHover={{ y: -6 }}
                    onClick={() => navigate(`/product/${relItem.id}`)}
                    className="cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="aspect-square bg-white p-4 flex items-center justify-center rounded-xl">
                      <img src={relItem.image} alt={relItem.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase">{relItem.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{relItem.title}</h4>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-black text-slate-900 dark:text-white">${relItem.price.toFixed(2)}</span>
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">View →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
