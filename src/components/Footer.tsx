import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Intro */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white shadow-md">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">ZenithStore</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Experience the pinnacle of online shopping. We provide curated, premium products with seamless checkouts and unparalleled service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 18.251" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200" aria-label="Instagram">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200" aria-label="GitHub">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Quick Links</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link to="/" className="hover:text-white transition-colors duration-150">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="hover:text-white transition-colors duration-150">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/checkout" className="hover:text-white transition-colors duration-150">Checkout</Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-white transition-colors duration-150">Sign In</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-150">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-150">Returns & Exchanges</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-150">FAQs</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-150">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Contact Info</h3>
              <ul className="mt-4 space-y-3.5 text-sm">
                <li className="flex items-start space-x-2.5">
                  <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
                  <span>123 Innovation Boulevard, Suite 500, Tech City, TC 94016</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-primary-500 shrink-0" />
                  <span>+1 (555) 019-2834</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Mail className="h-4 w-4 text-primary-500 shrink-0" />
                  <span>support@zenithstore.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ZenithStore Inc. All rights reserved. Made for SCIC.
          </p>
          <p className="mt-2 md:mt-0 text-xs text-slate-500">
            Designed for Apple-like simplicity, built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
};
