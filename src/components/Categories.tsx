import React from 'react';
import { Headphones, Gem, Watch, Shirt, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Category {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  apiCategory: string;
}

export const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      title: 'Audio Devices',
      description: 'Headphones, earbuds & speakers',
      icon: Headphones,
      color: 'from-blue-500 to-indigo-500',
      apiCategory: 'electronics',
    },
    {
      title: 'Elegant Jewelry',
      description: 'Gold, silver & precious gems',
      icon: Gem,
      color: 'from-amber-400 to-amber-600',
      apiCategory: 'jewelery',
    },
    {
      title: 'Smart Wearables',
      description: 'Watches, trackers & gear',
      icon: Watch,
      color: 'from-emerald-400 to-teal-600',
      apiCategory: 'electronics',
    },
    {
      title: "Men's Apparel",
      description: 'Premium coats, shirts & casual wear',
      icon: Shirt,
      color: 'from-cyan-500 to-blue-600',
      apiCategory: "men's clothing",
    },
    {
      title: "Women's Fashion",
      description: 'Trendy dresses, jackets & statements',
      icon: Heart,
      color: 'from-rose-400 to-pink-600',
      apiCategory: "women's clothing",
    },
    {
      title: 'Accessories',
      description: 'Bags, glasses & style essentials',
      icon: Sparkles,
      color: 'from-violet-500 to-purple-600',
      apiCategory: 'electronics',
    },
  ];

  return (
    <section id="categories" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-950/90 relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Browse By Category
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-base">
            Explore our curated sub-sections designed to help you find the absolute best products in class.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary-100 dark:hover:border-slate-700 cursor-pointer"
              >
                {/* Subtle card background glow on hover */}
                <div className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-primary-50/50 dark:bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Glowing icon container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${category.color} text-white shadow-md shadow-slate-200 dark:shadow-none transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.title}
                </h3>
                
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                  <span>Explore Items</span>
                  <span className="ml-1 transform transition-transform group-hover:translate-x-1.5 duration-200">
                    &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

