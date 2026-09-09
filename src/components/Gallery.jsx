import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { staticGalleryImages } from "../data/galleryImages";
import { fetchGalleryState, uploadedImageUrl } from "../lib/galleryClient";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [hiddenStaticIds, setHiddenStaticIds] = useState([]);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    fetchGalleryState()
      .then((state) => {
        setHiddenStaticIds(state.hiddenStaticIds || []);
        setUploads(state.uploads || []);
      })
      .catch(() => {
        setHiddenStaticIds([]);
        setUploads([]);
      });
  }, []);

  const galleryImages = [
    ...uploads
      .filter((image) => uploadedImageUrl(image))
      .map((image) => ({
        id: image.id,
        src: uploadedImageUrl(image),
      })),
    ...staticGalleryImages.filter((image) => !hiddenStaticIds.includes(image.id)),
  ];

  const displayedImages = galleryImages.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  return (
    <div className="min-h-screen bg-soft-pearl text-deep-navy pt-32 pb-24 px-6 relative">
      {/* 2. Added the SEO Keywords specifically for the Gallery */}
      <Helmet>
        <title>Gallery | Reet Sangeet Music Academy Gurugram</title>
        <meta
          name="description"
          content="Explore our gallery! See photos of student performances, dance recitals, and daily music classes at Reet Sangeet Music Academy in Gurugram."
        />
        <meta
          name="keywords"
          content="music academy photos, student performances gurugram, dance recital pictures, guitar class images, Reet Sangeet gallery, music classes near me"
        />
      </Helmet>

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
            A glimpse into the vibrant life, passionate performances, and daily
            learning at Reet Sangeet.
          </motion.p>
        </div>

        {/* Auto-Fitted Masonry Layout using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {displayedImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 9) * 0.05 }}
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

        {/* Load More Button */}
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
