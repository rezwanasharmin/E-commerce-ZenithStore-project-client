import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, ShoppingBag, User, LogOut, Sun, Moon, ChevronDown, LayoutDashboard, PlusCircle, ListOrdered, CreditCard, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categoriesList = [
    { name: '🎧 Electronics & Audio', path: '/#featured-products' },
    { name: '💎 Jewelry & Gems', path: '/#featured-products' },
    { name: "👔 Men's Apparel", path: '/#featured-products' },
    { name: "👗 Women's Fashion", path: '/#featured-products' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white shadow-md shadow-primary-200 dark:shadow-none"
              >
                <ShoppingBag className="h-5 w-5" />
              </motion.div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                ZenithStore
              </span>
            </Link>
          </div>

          {/* Desktop Primary Navigation Links (Perfectly Centered) */}
          <div className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 -translate-x-1/2">
            
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs font-bold transition-colors ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              Home
            </NavLink>

            {/* Categories Dropdown Menu */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center space-x-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Layers className="h-3.5 w-3.5 text-primary-500" />
                <span>Categories</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCategoryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Shop By Department
                    </div>
                    {categoriesList.map((cat) => (
                      <a
                        key={cat.name}
                        href={cat.path}
                        onClick={() => setIsCategoryMenuOpen(false)}
                        className="block rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/#featured-products"
              className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Catalog & Featured
            </a>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-xs font-bold transition-colors ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-xs font-bold transition-colors ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              Contact
            </NavLink>

          </div>

          {/* Desktop Right Action Controls */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Dark Mode Switcher */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="rounded-xl p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-slate-700" />}
            </motion.button>

            {/* Cart Drawer Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
            >
              <ShoppingBag className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-extrabold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Profile Dropdown for Logged-In User or Sign In Button */}
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-primary-600 to-indigo-500 text-white font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                        <p className="font-extrabold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-primary-500" />
                        <span>Analytics Dashboard</span>
                      </Link>

                      <Link
                        to="/items/add"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <PlusCircle className="h-4 w-4 text-emerald-500" />
                        <span>Add New Product</span>
                      </Link>

                      <Link
                        to="/items/manage"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <ListOrdered className="h-4 w-4 text-amber-500" />
                        <span>Manage Inventory</span>
                      </Link>

                      <Link
                        to="/checkout"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <CreditCard className="h-4 w-4 text-indigo-500" />
                        <span>Checkout Orders</span>
                      </Link>

                      <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-4 py-2 text-xs font-extrabold text-white shadow-md hover:bg-slate-800 transition-all hover:scale-[1.02]"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}

          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button onClick={toggleTheme} className="rounded-lg p-2 text-slate-500 dark:text-slate-400">
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-slate-600 dark:text-slate-300">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1.5 px-4 py-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Home
          </NavLink>
          <a
            href="/#featured-products"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Catalog & Categories
          </a>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Contact
          </NavLink>

          {user && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <div className="px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Seller & Admin Portal
              </div>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                📊 Analytics Dashboard
              </Link>
              <Link
                to="/items/add"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                ➕ Add New Product
              </Link>
              <Link
                to="/items/manage"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                📋 Manage Inventory
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                🛒 Checkout Orders
              </Link>
            </div>
          )}

          <div className="border-t border-slate-100 dark:border-slate-800 my-3 pt-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 text-left rounded-xl px-4 py-2.5 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 px-4 py-3 text-sm font-extrabold text-white shadow-sm"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
