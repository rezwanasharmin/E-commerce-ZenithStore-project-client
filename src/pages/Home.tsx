import React from 'react';
import { Hero } from '../components/Hero';
import { Highlights } from '../components/Highlights';
import { Categories } from '../components/Categories';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { Newsletter } from '../components/Newsletter';

export const Home: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Hero />
      <Highlights />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
};
