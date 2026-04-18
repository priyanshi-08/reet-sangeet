import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import QuoteCarousel from './QuoteCarousel';
import HeroCarousel from './HeroCarousel';
import HomeAbout from './HomeAbout';
import HomeCourses from './HomeCourses';

function Home() {
  const phoneLink = "https://wa.me/917303747778?text=Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20booking%20a%20free%20demo%20class.";

  return (
    <div className="min-h-screen bg-soft-pearl text-deep-navy">
      <HeroCarousel />
      <HomeAbout />
      <HomeCourses />
      <QuoteCarousel />
    </div>
  );
}

export default Home;