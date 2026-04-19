import React from 'react';
import { motion } from 'framer-motion';
import trinity from "../assets/certifications/trinity.jpg";
import prayag from "../assets/certifications/prayag.jpg";


function Certifications() {
 
  // Updated array to use image placeholders instead of gradient classes
  const courses = [
    { 
      title: "Trinity College London",
      bgImageUrl: trinity
    },
    { 
        title: "Prayag Sangeet Samiti,Allahabad",
        bgImageUrl: prayag
      },
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
            Affiliations
          </motion.h2>
          <p className="text-lg text-deep-navy/70 max-w-6xl mx-auto">
           Reet Sangeet Music Academy, the best music school in Gurgaon, is affiliated with Prayag Sangeet Samiti,Allahabad for imparting Hindustani Classical Music. For Western Music, we prepare our students for various grade exams conducted by Trinity School of London for the course of their choice.
          </p>
        </div>
        
        {/* Two affiliation cards — centered */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-8 md:gap-10 max-w-5xl mx-auto">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center gap-4 w-full sm:w-[min(100%,22rem)] md:w-[min(100%,26rem)]"
            >
              <div
                className="group w-full min-h-[18rem] md:min-h-[22rem] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden border border-gray-100 hover:-translate-y-1 bg-cover bg-center"
                style={{ backgroundImage: `url(${course.bgImageUrl})` }}
              >
                <div className="absolute inset-0 bg-deep-navy/10" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-deep-navy text-center px-1">
                {course.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Certifications;