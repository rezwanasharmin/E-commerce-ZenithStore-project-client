import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, freeShippingThreshold } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const progressPercentage = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - cartTotal, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (!promoCode.trim()) {
      setPromoError('Please enter a valid code');
      return;
    }

    if (promoCode.trim().toUpperCase() === 'ZENITH10' || promoCode.trim().toUpperCase() === 'SAVE10') {
      setAppliedDiscount(0.1); // 10% off
      setPromoSuccess('10% Promo discount applied!');
    } else {
      setPromoError('Invalid code. Try "ZENITH10"');
    }
  };

  const discountAmount = cartTotal * appliedDiscount;
  const finalTotal = Math.max(cartTotal - discountAmount, 0);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-5">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 font-bold">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Your Shopping Cart
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                  <Truck className="h-4 w-4 text-primary-500" />
                  <span>
                    {amountToFreeShipping === 0
                      ? 'You unlocked FREE Shipping!'
                      : `Add $${amountToFreeShipping.toFixed(2)} more for FREE shipping`}
                  </span>
                </span>
                <span className="text-primary-600 font-bold">{progressPercentage.toFixed(0)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                    <ShoppingBag className="h-10 w-10" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                    Explore our curated collection to find luxury items and add them to your cart.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-6 py-2.5 text-xs font-semibold text-white shadow hover:bg-slate-800 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/60 p-3.5 shadow-sm"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white p-2 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="text-xs font-extrabold text-primary-600 dark:text-primary-400 mt-1">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer Summary */}
            {cart.length > 0 && (
              <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 p-5 space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder='Promo Code (e.g. ZENITH10)'
                      className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-slate-200 dark:bg-slate-700 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[11px] text-rose-500 font-medium">{promoError}</p>}
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
                      <Check className="h-3 w-3" />
                      <span>{promoSuccess}</span>
                    </p>
                  )}
                </form>

                {/* Price Calculation */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">${cartTotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount (10%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Shipping</span>
                    <span>{amountToFreeShipping === 0 ? 'FREE' : '$9.99'}</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
                    <span>Total</span>
                    <span className="text-primary-600 dark:text-primary-400">${(finalTotal + (amountToFreeShipping === 0 ? 0 : 9.99)).toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
