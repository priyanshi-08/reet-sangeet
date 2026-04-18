import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function HeroCarousel() {
  const phoneLink = "https://wa.me/917303747778?text=Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20booking%20a%20free%20demo%20class.";

  const slides = [
    {
      id: 1,
      title: "Unlock Your Musical Talent",
      subtitle: "Personalized training in Guitar, Keyboard, Singing & Bollywood Music.",
      // You will replace this empty string with your image URL later: e.g., "url('/images/hero-1.jpg')"
      bgImage: "linear-gradient(to right, #292F36, #4ECDC4)" 
    },
    {
      id: 2,
      title: "Where Every Note Tells a Story.",
      subtitle: "Join a vibrant community of passionate learners in Gurugram.",
      // You will replace this empty string with your image URL later: e.g., "url('/images/hero-2.jpg')"
      bgImage: "linear-gradient(to right, #292F36, #FF6B6B)" 
    }
  ];

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh]">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image Container */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ background: slide.bgImage }}
            >
              {/* Dark Overlay to ensure text readability when you add real images */}
              <div className="absolute inset-0 bg-deep-navy/60"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-soft-pearl/90 font-medium mb-10 max-w-2xl mx-auto">
                  {slide.subtitle}
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;