import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaGoogle } from 'react-icons/fa';

// Import Swiper styling
import 'swiper/css';
import 'swiper/css/pagination';

const reviewContext = require.context(
  '../../assets/reviews',
  false,
  /\.(png|jpe?g|webp)$/i
);

const reviewImages = reviewContext
  .keys()
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map((filePath, index) => {
    const fileName = filePath.replace('./', '');
    const label = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    return {
      id: index + 1,
      src: reviewContext(filePath),
      alt: `Google review screenshot ${label}`
    };
  });

function QuoteCarousel() {
  return (
    <section className="py-24 px-6 bg-soft-pearl overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-deep-navy mb-4">Real Words from Our Community</h2>
          <div className="flex items-center justify-center gap-2 text-deep-navy/70">
            <FaGoogle className="text-xl text-gray-400" /> 
            <a 
              href="https://www.google.com/search?sca_esv=53030c98d15754b0&rlz=1C5CHFA_enIN1042IN1042&sxsrf=ANbL-n76HD_91RnAbrJYddFjA7PZrTnrwA:1776508518324&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOfH_8vppW7KCZ6SncXq_3X5T3nhnS6exNrWPxcCh4nvMeaAgzMErSlAST8dkO7KAYA44OsJpQSf9GOQntVlDAsqvxsVI12K-8GHESo2oCrLT7vJgKw%3D%3D&q=Reet+Sangeet+Music+Academy+Reviews&sa=X&ved=2ahUKEwiT_bL5mfeTAxV5r1YBHSXlBkIQ0bkNegQIJxAF&biw=1280&bih=688&dpr=2#lrd=0x390d3d7a3e7fec95:0x2ff53b86c4736ef2,1,,,,"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-lg hover:text-soothing-teal hover:underline transition-colors"
            >
            <span className="font-semibold text-lg">4.8/5 Rating on Google Maps</span>
            </a>
          </div>
        </div>
        
        {/* Image Carousel */}
        {reviewImages.length === 0 ? (
          <p className="text-center text-deep-navy/70">No review images found.</p>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              // On desktop, show 2 review screenshots side-by-side
              768: { slidesPerView: 2 },
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            className="pb-16 px-4"
          >
            {reviewImages.map((review) => (
              <SwiperSlide key={review.id}>
                {/* Image Frame: Adds a clean white border and shadow to the screenshot */}
                <div className="bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
                  <img 
                    src={review.src} 
                    alt={review.alt} 
                    className="w-full h-auto object-contain rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
}

export default QuoteCarousel;