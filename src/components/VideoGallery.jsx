import React from 'react';
import { motion } from 'framer-motion';

function VideoGallery() {
  // Array of your videos. Notice how we just use the simple text path 
  // because they are safely stored in the public/videos/ folder!
  const videos = [
    { id: 1, src: "/videos/review1.mp4", title: "Vaishnavi's Parent Says.." },
    { id: 2, src: "/videos/review2.mp4", title: "Navya's Parent Says.." },
    // { id: 3, src: "/videos/video3.mp4", title: "Kathak Dance Rehearsal" },
    // { id: 4, src: "/videos/video4.mp4", title: "Hindustani Vocal Practice" },
  ];

  return (
    <section className="py-20 px-6 bg-soft-pearl text-deep-navy min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
          >
            Watch Us in <span className="text-sunset-coral">Action</span>
          </motion.h1>
          <p className="text-lg text-deep-navy/70 max-w-2xl mx-auto">
            Experience the energy, dedication, and talent of our students and mentors at Reet Sangeet.
          </p>
        </div>

        {/* 2x2 Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {videos.map((video, index) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-4 rounded-3xl shadow-lg border border-deep-navy/5 flex flex-col"
            >
              {/* The Video Player */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                <video 
                  src={video.src} 
                  className="absolute inset-0 w-full h-full object-cover"
                  controls 
                  preload="metadata" // Only loads the first frame to save data!
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Video Title */}
              <div className="pt-6 pb-2 px-2 text-center">
                <h3 className="text-xl font-bold text-deep-navy">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default VideoGallery;