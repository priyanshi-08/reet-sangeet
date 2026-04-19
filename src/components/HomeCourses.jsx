import React from 'react';
import { motion } from 'framer-motion';
import guitar from "../assets/courses/guitar.jpg";
import piano from "../assets/courses/piano.jpg";
import classical from "../assets/courses/classical.jpg";
import hiphop from "../assets/courses/hip-hop.jpg";
import kathak from "../assets/courses/kathak.jpg";
import harmonium from "../assets/courses/harmonium.jpg";
import tabla from "../assets/courses/tabla.jpg";
import theatre from "../assets/courses/theatre.jpg";


function HomeCourses() {
  const whatsappMsg = "Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20knowing%20more%20about%20your%20classes.";
  const phoneLink = `https://wa.me/917303747778?text=${whatsappMsg}`;

  // Updated array to use image placeholders instead of gradient classes
  const courses = [
    { 
      title: "Guitar",
      desc: "Master chords, strumming, and fingerpicking techniques.",
      bgImageUrl: guitar
    },
    { 
      title: "Piano / Keyboard",
      desc: "Learn scales, sheet music, and beautiful melodies.",
      bgImageUrl: piano
    },
    { 
      title: "Hindustani Classical",
      desc: "Build a strong foundation in raags and voice modulation.",
      bgImageUrl: classical
    },
    { 
      title: "Hip-hop & Bollywood",
      desc: "Groove to the latest beats with energetic choreography.",
      bgImageUrl: hiphop
    },
    { 
      title: "Kathak",
      desc: "Embrace the grace, expressions, and rhythm of classical dance.",
      bgImageUrl: kathak
    },
    { 
      title: "Harmonium",
      desc: "Learn the soulful keys of this traditional accompanying instrument.",
      bgImageUrl: harmonium
    },
    { 
      title: "Tabla",
      desc: "Master the beats, taals, and complex rhythmic patterns.",
      bgImageUrl: tabla
    },
    { 
      title: "Theatres",
      desc: "Build confidence, expression, and stage presence through acting.",
      bgImageUrl: theatre
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
              <div className="absolute inset-0 bg-deep-navy/55"></div>

              <h3 className="text-2xl font-bold mb-3 text-white relative z-10">{course.title}</h3>
              <p className="text-white/90 leading-relaxed mb-6 flex-grow font-medium relative z-10">
                {course.desc}
              </p>
              
              {/* Dynamic hover link */}
              <span className="text-white font-bold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1 relative z-10">
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