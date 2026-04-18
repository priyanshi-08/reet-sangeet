import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className=" relative w-full h-[85vh] md:h-[90vh] min-h-screen bg-white py-24 px-6 text-deep-navy">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-16 text-deep-navy"
        >
          Our Story
        </motion.h1>
        <p className="text-xl leading-relaxed max-w-3xl mx-auto text-deep-navy/80">
          Reet Sangeet Music Academy was born from a simple belief — music is not about perfection, it's about expression. We nurture creativity over rigid theory, letting each student find their unique musical identity.
        </p>
      </div>
    </div>
  );
}

export default About;