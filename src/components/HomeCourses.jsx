import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGuitar, 
  FaMusic, 
  FaMicrophoneAlt, 
  FaFire, 
  FaLeaf, 
  FaLayerGroup, 
  FaDrum, 
  FaTheaterMasks 
} from 'react-icons/fa';

function HomeCourses() {
  const whatsappMsg = "Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20knowing%20more%20about%20your%20classes.";
  const phoneLink = `https://wa.me/917303747778?text=${whatsappMsg}`;

  const courses = [
    { title: "Guitar", icon: <FaGuitar />, desc: "Master chords, strumming, and fingerpicking techniques." },
    { title: "Piano / Keyboard", icon: <FaMusic />, desc: "Learn scales, sheet music, and beautiful melodies." },
    { title: "Hindustani Classical", icon: <FaMicrophoneAlt />, desc: "Build a strong foundation in raags and voice modulation." },
    { title: "Hip-hop & Bollywood", icon: <FaFire />, desc: "Groove to the latest beats with energetic choreography." },
    { title: "Kathak", icon: <FaLeaf />, desc: "Embrace the grace, expressions, and rhythm of classical dance." },
    { title: "Harmonium", icon: <FaLayerGroup />, desc: "Learn the soulful keys of this traditional accompanying instrument." },
    { title: "Tabla", icon: <FaDrum />, desc: "Master the beats, taals, and complex rhythmic patterns." },
    { title: "Theatres", icon: <FaTheaterMasks />, desc: "Build confidence, expression, and stage presence through acting." }
  ];

  return (
    <section className="py-24 px-6 bg-soft-pearl border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-deep-navy"
          >
            Explore Our Programs
          </motion.h2>
          <p className="text-lg text-deep-navy/70 max-w-2xl mx-auto">
            Whether you want to sing, dance, act, or play an instrument, we have a program designed to bring out your best.
          </p>
        </div>
        
        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, idx) => (
            <motion.a 
              href={phoneLink}
              target="_blank"
              rel="noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-soothing-teal/30 transition-all cursor-pointer relative overflow-hidden flex flex-col items-center text-center"
            >
              {/* Background Highlight Effect on Hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-soothing-teal/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="text-4xl text-sunset-coral mb-5 group-hover:text-soothing-teal transition-colors duration-300">
                {course.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-deep-navy">{course.title}</h3>
              <p className="text-sm text-deep-navy/60 leading-relaxed mb-4 flex-grow">
                {course.desc}
              </p>
              
              <span className="text-soothing-teal font-semibold text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                Ask about this →
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HomeCourses;