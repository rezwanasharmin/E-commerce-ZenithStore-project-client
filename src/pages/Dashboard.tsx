import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Package, Heart, ShoppingCart, LogOut, ArrowRight, UserCheck, Calendar, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface OrderItem {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
  itemsCount: number;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  
  const [wishlistCount] = useState(4);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Recharts Sales Analytics Data
  const monthlyAnalytics = [
    { month: 'Jan', spending: 120, orders: 2 },
    { month: 'Feb', spending: 280, orders: 4 },
    { month: 'Mar', spending: 190, orders: 3 },
    { month: 'Apr', spending: 450, orders: 6 },
    { month: 'May', spending: 320, orders: 4 },
    { month: 'Jun', spending: 580, orders: 8 },
    { month: 'Jul', spending: 420, orders: 5 },
  ];

  const categoryDistribution = [
    { name: 'Audio & Electronics', value: 45, color: '#8b5cf6' },
    { name: 'Wearables & Gear', value: 25, color: '#10b981' },
    { name: 'Jewelry & Gems', value: 20, color: '#f59e0b' },
    { name: 'Apparel & Fashion', value: 10, color: '#3b82f6' },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      let combinedOrders: OrderItem[] = [];

      // Read local orders placed in current session
      try {
        const localRaw = localStorage.getItem('zenith_orders');
        if (localRaw) {
          const parsed = JSON.parse(localRaw);
          const mappedLocal = parsed.map((ord: any) => ({
            id: ord.orderId,
            date: ord.date,
            total: ord.total,
            status: ord.status || 'Processing',
            itemsCount: ord.quantity || 1
          }));
          combinedOrders = [...mappedLocal];
        }
      } catch (e) {
        console.error('Failed reading local orders:', e);
      }

      // Fetch backend API orders
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        if (Array.isArray(response.data)) {
          const mappedApi = response.data.map((order: any) => ({
            id: order.orderId,
            date: order.date,
            total: order.total,
            status: order.status || 'Processing',
            itemsCount: order.quantity || 1
          }));
          
          // Avoid duplicate order IDs
          mappedApi.forEach((apiOrd: OrderItem) => {
            if (!combinedOrders.some((o) => o.id === apiOrd.id)) {
              combinedOrders.push(apiOrd);
            }
          });
        }
      } catch (err) {
        console.warn('Backend orders fetch failed, showing local orders.', err);
      }

      setOrders(combinedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Account Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage your personal credentials, order history, and spending analytics.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column: User Profile Card & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* User Profile Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-primary-100/40 dark:bg-primary-900/20 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
              
              <div className="flex flex-col items-center text-center py-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 font-extrabold text-2xl mb-4 border-2 border-primary-100 dark:border-primary-800 shadow-md shadow-primary-100/50 dark:shadow-none"
                >
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user?.name || 'User Name'}</h3>
                <p className="text-sm text-slate-400 font-medium">{user?.email || 'user@example.com'}</p>
                
                <div className="mt-6 flex items-center space-x-2 rounded-full bg-slate-50 dark:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                  <UserCheck className="h-3.5 w-3.5 text-accent-emerald" />
                  <span>Authenticated Client</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Action buttons */}
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="flex flex-col space-y-3">
                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    to="/"
                    className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
                  >
                    <span>Continue Shopping</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    to="/checkout"
                    className="flex items-center justify-between rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all"
                  >
                    <span>Go to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between rounded-xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/30 px-4 py-3 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 transition-all"
                  >
                    <span>Logout Profile</span>
                    <LogOut className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stats, Recharts Analytics & Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            
            {/* Dashboard stats (Orders, Wishlist, Cart) */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {/* Orders Stat */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center space-x-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shadow-sm">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Orders</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{orders.length}</p>
                </div>
              </motion.div>

              {/* Wishlist Stat */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center space-x-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 dark:text-rose-400 shadow-sm">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Wishlist Items</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{wishlistCount}</p>
                </div>
              </motion.div>

              {/* Cart Contents Stat */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center space-x-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shadow-sm">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Cart Contents</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{cartCount}</p>
                </div>
              </motion.div>
            </div>

            {/* Recharts Interactive Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Monthly Spending Trend Area Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="lg:col-span-7 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary-500" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Spending & Order History
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">2026 Analytics</span>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '12px',
                          border: 'none',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="spending"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#spendingGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Category Breakdown Donut Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center space-x-2 mb-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <PieIcon className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Category Breakdown
                  </h3>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '12px',
                          border: 'none',
                          color: '#fff',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  {categoryDistribution.map((item) => (
                    <div key={item.name} className="flex items-center space-x-1.5">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Recent Orders section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
            >
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                Recent Purchase Orders
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                      <th className="py-3 px-1">Order ID</th>
                      <th className="py-3">Date Placed</th>
                      <th className="py-3">Quantity</th>
                      <th className="py-3">Price Total</th>
                      <th className="py-3 text-right pr-1">Delivery Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                    {orders.map((order, idx) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors duration-150 font-medium"
                      >
                        <td className="py-4 px-1 text-slate-900 dark:text-white font-bold">{order.id}</td>
                        <td className="py-4 text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1.5 text-xs">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>{order.date}</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-500 dark:text-slate-400">{order.itemsCount} product(s)</td>
                        <td className="py-4 text-slate-900 dark:text-white font-bold">${order.total.toFixed(2)}</td>
                        <td className="py-4 text-right pr-1">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-accent-emerald'
                                : order.status === 'In Transit'
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};
