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

  // Updated array to use image placeholders instead of gradient classes
  const courses = [
    { 
      title: "Guitar", icon: <FaGuitar />, 
      desc: "Master chords, strumming, and fingerpicking techniques.",
      bgImageUrl: "https://placehold.co/400x400/FFDDC1/FFDDC1?text=Guitar",
      iconColor: "text-orange-500"
    },
    { 
      title: "Piano / Keyboard", icon: <FaMusic />, 
      desc: "Learn scales, sheet music, and beautiful melodies.",
      bgImageUrl: "https://placehold.co/400x400/C1E1FF/C1E1FF?text=Piano",
      iconColor: "text-blue-500"
    },
    { 
      title: "Hindustani Classical", icon: <FaMicrophoneAlt />, 
      desc: "Build a strong foundation in raags and voice modulation.",
      bgImageUrl: "https://placehold.co/400x400/FFC1E3/FFC1E3?text=Vocal",
      iconColor: "text-rose-500"
    },
    { 
      title: "Hip-hop & Bollywood", icon: <FaFire />, 
      desc: "Groove to the latest beats with energetic choreography.",
      bgImageUrl: "https://placehold.co/400x400/FFF8C1/FFF8C1?text=Dance",
      iconColor: "text-amber-500"
    },
    { 
      title: "Kathak", icon: <FaLeaf />, 
      desc: "Embrace the grace, expressions, and rhythm of classical dance.",
      bgImageUrl: "https://placehold.co/400x400/C1FFD9/C1FFD9?text=Kathak",
      iconColor: "text-emerald-500"
    },
    { 
      title: "Harmonium", icon: <FaLayerGroup />, 
      desc: "Learn the soulful keys of this traditional accompanying instrument.",
      bgImageUrl: "https://placehold.co/400x400/FFE7C1/FFE7C1?text=Harmonium",
      iconColor: "text-amber-600"
    },
    { 
      title: "Tabla", icon: <FaDrum />, 
      desc: "Master the beats, taals, and complex rhythmic patterns.",
      bgImageUrl: "https://placehold.co/400x400/E1E1E1/E1E1E1?text=Tabla",
      iconColor: "text-slate-500"
    },
    { 
      title: "Theatres", icon: <FaTheaterMasks />, 
      desc: "Build confidence, expression, and stage presence through acting.",
      bgImageUrl: "https://placehold.co/400x400/E3C1FF/E3C1FF?text=Theatre",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 text-deep-navy tracking-tight"
          >
            Explore Our Programs
          </motion.h2>
          <p className="text-lg text-deep-navy/70 max-w-2xl mx-auto">
            Whether you want to sing, dance, act, or play an instrument, we have a program designed to bring out your best.
          </p>
        </div>
        
        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
              // Added bg-cover bg-center here and removed the gradient classes
              className={`group p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center text-center border border-gray-100 hover:-translate-y-1 bg-cover bg-center`}
              style={{ backgroundImage: `url(${course.bgImageUrl})` }}
            >
              
              {/* Icon Container (Kept white box) */}
              <div className={`text-5xl mb-6 ${course.iconColor} bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {course.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-deep-navy relative z-10">{course.title}</h3>
              <p className="text-deep-navy/70 leading-relaxed mb-6 flex-grow font-medium relative z-10">
                {course.desc}
              </p>
              
              {/* Dynamic hover link */}
              <span className={`${course.iconColor} font-bold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1 relative z-10`}>
                Ask about this <span>→</span>
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HomeCourses;