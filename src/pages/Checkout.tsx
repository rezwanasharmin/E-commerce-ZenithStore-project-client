import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle, Truck, CreditCard, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const location = useLocation();

  // Handle single product passed via location state if cart is empty
  const stateProduct = (location.state as any)?.product;
  const stateQuantity = (location.state as any)?.quantity || 1;

  // Items to checkout
  const itemsToCheckout = cart.length > 0
    ? cart
    : stateProduct
    ? [{
        id: stateProduct.id,
        title: stateProduct.title,
        price: stateProduct.price,
        image: stateProduct.image,
        category: stateProduct.category,
        quantity: stateQuantity
      }]
    : [];

  const subtotal = itemsToCheckout.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 100 || subtotal === 0 ? 0.00 : 15.00;
  const total = subtotal + shippingCost;

  // Form State
  const [fullName, setFullName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 019-2834');
  const [address, setAddress] = useState('123 Innovation Boulevard, Suite 500, Tech City, TC 94016');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [confirmedItems, setConfirmedItems] = useState<any[]>([]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) errors.fullName = 'Full Name is required';
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(phoneNumber.trim())) {
      errors.phoneNumber = 'Enter a valid phone number';
    }

    if (!address.trim()) errors.address = 'Delivery Address is required';

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
        errors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!cardExpiry.trim()) errors.cardExpiry = 'MM/YY required';
      if (!cardCvc.trim() || cardCvc.length < 3) errors.cardCvc = '3-digit CVC required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itemsToCheckout.length === 0) {
      alert('Your cart is empty. Please add items to checkout.');
      return;
    }

    if (!validateForm()) return;

    setIsPlacing(true);

    const generatedOrderId = 'ZENTH-' + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const orderData = {
      orderId: generatedOrderId,
      items: itemsToCheckout,
      total: total,
      date: currentDate,
      status: 'Processing',
      quantity: itemsToCheckout.reduce((acc, item) => acc + item.quantity, 0),
      shippingInfo: {
        fullName,
        phoneNumber,
        address,
        paymentMethod
      }
    };

    try {
      // Post order to backend API
      await axios.post('http://localhost:5000/api/orders', orderData);
    } catch (err) {
      console.warn('Backend server order save offline, persisting order to localStorage.', err);
    }

    // Save order locally in localStorage so Dashboard reads it instantly
    try {
      const existingOrdersRaw = localStorage.getItem('zenith_orders');
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      localStorage.setItem('zenith_orders', JSON.stringify([orderData, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage:', e);
    }

    // Preserve order items for confirmation screen then clear cart
    setConfirmedItems(itemsToCheckout);
    setConfirmedOrderId(generatedOrderId);
    setOrderConfirmed(true);
    clearCart();
    setIsPlacing(false);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-xl space-y-6"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-500 mb-2">
            <CheckCircle className="h-10 w-10" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">Order Confirmed!</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Thank you for your purchase. Order <code className="font-bold text-slate-900 dark:text-white">{confirmedOrderId}</code> has been received.
            </p>
          </div>

          {/* Purchased Items List Summary */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 p-4 text-left space-y-3">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Order Items Purchased ({confirmedItems.length})</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {confirmedItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate max-w-[220px]">
                    <img src={item.image} alt={item.title} className="h-8 w-8 rounded-lg object-contain bg-white p-0.5 border shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">x{item.quantity} (${(item.price * item.quantity).toFixed(2)})</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 space-y-1 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Recipient:</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">{fullName}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Total Paid:</span>
                <span className="text-slate-900 dark:text-white font-extrabold text-sm">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/dashboard"
              className="flex-1 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 py-3 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-all text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/"
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Store</span>
          </Link>
          <div className="inline-flex items-center space-x-2 rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-100 dark:border-primary-800/60 px-3.5 py-1 text-xs font-bold text-primary-700 dark:text-primary-300">
            <ShieldCheck className="h-3.5 w-3.5 text-primary-500" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
          Express Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Delivery & Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shipping Information Card */}
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Shipping & Delivery Details</h2>
                  <p className="text-xs text-slate-400">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                  </div>
                  {formErrors.fullName && <p className="mt-1 text-[11px] font-bold text-rose-500">{formErrors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Phone className="h-4 w-4" />
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                  </div>
                  {formErrors.phoneNumber && <p className="mt-1 text-[11px] font-bold text-rose-500">{formErrors.phoneNumber}</p>}
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                    Complete Shipping Address *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-slate-400">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street address, apartment, suite, city, state, zip code..."
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                  </div>
                  {formErrors.address && <p className="mt-1 text-[11px] font-bold text-rose-500">{formErrors.address}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment Selection</h2>
                  <p className="text-xs text-slate-400">Choose your preferred payment method</p>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-center space-x-2 rounded-2xl border p-4 text-xs font-bold transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-primary-500 bg-primary-50/40 dark:bg-slate-800 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <Truck className="h-4 w-4" />
                  <span>Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center space-x-2 rounded-2xl border p-4 text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary-500 bg-primary-50/40 dark:bg-slate-800 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Credit / Debit Card</span>
                </button>
              </div>

              {/* Card Inputs if Card Payment Selected */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8892"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
                    />
                    {formErrors.cardNumber && <p className="mt-1 text-[11px] font-bold text-rose-500">{formErrors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
                      />
                      {formErrors.cardExpiry && <p className="mt-1 text-[11px] font-bold text-rose-500">{formErrors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Security CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
                      />
                      {formErrors.cardCvc && <p className="mt-1 text-[11px] font-bold text-rose-500">{formErrors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Dynamic Order Summary Box */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-primary-500" />
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Order Summary</h2>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {itemsToCheckout.length} Item(s)
                </span>
              </div>

              {/* Cart Empty Warning if no items */}
              {itemsToCheckout.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <AlertCircle className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Your shopping cart is empty</p>
                  <Link
                    to="/"
                    className="inline-block rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm"
                  >
                    Browse Catalog
                  </Link>
                </div>
              ) : (
                /* Dynamic Items List */
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {itemsToCheckout.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 rounded-2xl border border-slate-100 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-800/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-14 w-14 rounded-xl object-contain bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 capitalize">{item.category}</p>
                        
                        {/* Quantity Controls inside summary */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-slate-500">
                            Qty: <span className="text-slate-900 dark:text-white font-extrabold">{item.quantity}</span>
                          </span>
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Calculation Breakdown */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-slate-600 dark:text-slate-400">
                  <span>Items Subtotal</span>
                  <span className="text-slate-900 dark:text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600 dark:text-slate-400">
                  <span>Express Shipping</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {shippingCost === 0 ? <span className="text-emerald-500 font-extrabold">FREE</span> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-lg font-extrabold text-primary-600 dark:text-primary-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPlacing || itemsToCheckout.length === 0}
                className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 py-4 text-xs font-extrabold text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.01] disabled:opacity-40"
              >
                {isPlacing ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                ) : (
                  <>
                    <span>Confirm & Place Order (${total.toFixed(2)})</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
