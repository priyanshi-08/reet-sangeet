import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar, FaUserFriends } from 'react-icons/fa';

function HomeAbout() {
  const features = [
    { icon: <FaUserFriends />, title: "All Age Groups", desc: "Kids, teens, adults and senior citizen welcome." },
    { icon: <FaHeart />, title: "Built on Passion", desc: "Patience and understanding first." },
    { icon: <FaStar />, title: "Live Events", desc: "Building real stage confidence." }
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-deep-navy mb-6 tracking-tight">
            More Than Just a <span className="text-soothing-teal">Music School</span>
          </h2>
          <p className="text-lg text-deep-navy/70 leading-relaxed mb-8">
            Based in Gurugram, Reet Sangeet was born from a simple belief: music is not about perfection, it's about expression. We nurture creativity over rigid theory, letting every student find their unique musical identity in a welcoming, pressure-free environment.
          </p>
          
          <Link
            to="/about" 
            className="inline-flex items-center gap-2 text-sunset-coral font-bold text-lg group"
          >
            Read Our Full Story 
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </motion.div>

        {/* Right Side: Quick Feature Cards */}
        <div className="grid gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-soft-pearl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl text-sunset-coral mt-1 bg-white p-3 rounded-full shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-deep-navy mb-1">{feature.title}</h3>
                <p className="text-deep-navy/60">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HomeAbout;