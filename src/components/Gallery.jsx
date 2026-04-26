import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronDown } from 'react-icons/fa';

// Import all 21 images
import img1 from '../assets/gallery/image1.jpeg';
import img2 from '../assets/gallery/image2.jpeg';
import img3 from '../assets/gallery/image3.jpeg';
import img4 from '../assets/gallery/image4.jpeg';
import img5 from '../assets/gallery/image5.jpeg';
import img6 from '../assets/gallery/image6.jpeg';
import img7 from '../assets/gallery/image7.jpeg';
import img8 from '../assets/gallery/image8.jpeg';
import img9 from '../assets/gallery/image9.jpeg';
import img10 from '../assets/gallery/image10.jpeg';
import img11 from '../assets/gallery/image11.jpeg';
import img12 from '../assets/gallery/image12.jpeg';
import img13 from '../assets/gallery/image13.jpeg';
import img14 from '../assets/gallery/image14.jpeg';
import img15 from '../assets/gallery/image15.jpeg';
import img16 from '../assets/gallery/image16.jpeg';
import img17 from '../assets/gallery/image17.jpeg';
import img18 from '../assets/gallery/image18.jpeg';
import img19 from '../assets/gallery/image19.jpeg';
import img20 from '../assets/gallery/image20.jpeg';
import img21 from '../assets/gallery/image21.jpeg';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // NEW: State to control how many images are currently visible. We start with 9.
  const [visibleCount, setVisibleCount] = useState(9);

  const galleryImages = [
    { id: 1, src: img1 }, { id: 2, src: img2 }, { id: 3, src: img3 },
    { id: 4, src: img4 }, { id: 5, src: img5 }, { id: 6, src: img6 },
    { id: 7, src: img7 }, { id: 8, src: img8 }, { id: 9, src: img9 },
    { id: 10, src: img10 }, { id: 11, src: img11 }, { id: 12, src: img12 },
    { id: 13, src: img13 }, { id: 14, src: img14 }, { id: 15, src: img15 },
    { id: 16, src: img16 }, { id: 17, src: img17 }, { id: 18, src: img18 },
    { id: 19, src: img19 }, { id: 20, src: img20 }, { id: 21, src: img21 },
  ];

  // NEW: We slice the array so React only renders the ones we want visible
  const displayedImages = galleryImages.slice(0, visibleCount);

  // NEW: Function to handle the button click and add 9 more images
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  return (
    <div className="min-h-screen bg-soft-pearl text-deep-navy pt-32 pb-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-deep-navy"
          >
            Our <span className="text-sunset-coral">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-deep-navy/70 max-w-2xl mx-auto"
          >
            A glimpse into the vibrant life, passionate performances, and daily learning at Reet Sangeet.
          </motion.p>
        </div>

        {/* Auto-Fitted Masonry Layout using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {/* We now map over 'displayedImages' instead of the full 'galleryImages' */}
          {displayedImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 9) * 0.05 }} // Keeps animation snappy per batch
              onClick={() => setSelectedImage(img.src)}
              className="break-inside-avoid mb-4 md:mb-6 group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={`Reet Sangeet Gallery ${index + 1}`} 
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/20 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* NEW: Load More Button */}
        {visibleCount < galleryImages.length && (
          <div className="mt-16 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className="flex items-center gap-2 bg-white border-2 border-soothing-teal text-soothing-teal font-bold px-8 py-4 rounded-full shadow-sm hover:bg-soothing-teal hover:text-white transition-all duration-300"
            >
              Load More <FaChevronDown />
            </motion.button>
          </div>
        )}

      </div>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/95 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white text-3xl transition-colors bg-white/10 p-3 rounded-full"
            >
              <FaTimes />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Gallery Fullscreen"
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain cursor-default"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;