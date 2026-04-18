import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import QuoteCarousel from '../components/QuoteCarousel';
import HeroCarousel from '../components/HeroCarousel';
import HomeAbout from '../components/HomeAbout';
import HomeCourses from '../components/HomeCourses';

function Home() {
  const phoneLink = "https://wa.me/917303747778?text=Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20booking%20a%20free%20demo%20class.";

  return (
    <div className="min-h-screen bg-soft-pearl text-deep-navy">
      {/* <section className="flex flex-col items-center justify-center text-center px-6 py-32 md:py-40 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-soothing-teal/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-sunset-coral/10 rounded-full blur-3xl -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-deep-navy">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-coral to-soothing-teal">Musical Talent</span>
          </h1>
          <p className="text-2xl text-deep-navy/70 font-medium mb-8">
            Where every note tells a story.
          </p>
          <p className="text-lg mb-10 leading-relaxed text-deep-navy/80 max-w-2xl mx-auto">
            Personalized training in Guitar, Keyboard, Singing & Bollywood Music — for all ages. <br />
            <span className="font-bold text-deep-navy mt-3 inline-block bg-white px-4 py-1 rounded-full shadow-sm">Founded by Ruchi Vashistha in Gurugram</span>
          </p>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={phoneLink} 
            target="_blank" 
            rel="noreferrer"
            className="bg-sunset-coral text-white text-xl px-10 py-5 rounded-full font-extrabold shadow-xl hover:shadow-sunset-coral/30 transition-all inline-flex items-center gap-3"
          >
            <FaPhoneAlt />
            Book Free Demo via WhatsApp
          </motion.a>
        </motion.div>
      </section> */}
      <HeroCarousel />
      <HomeAbout />
      <HomeCourses />
      <QuoteCarousel />
    </div>
  );
}

export default Home;