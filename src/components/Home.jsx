import React from 'react';

import QuoteCarousel from './QuoteCarousel';
import HeroCarousel from './HeroCarousel';
import HomeAbout from './HomeAbout';
import HomeCourses from './HomeCourses';
import VideoGallery from './VideoGallery';

function Home() {

  return (
    <div className="min-h-screen bg-soft-pearl text-deep-navy">
      <HeroCarousel />
      <HomeAbout />
      <HomeCourses />
      <VideoGallery/>
      <QuoteCarousel />
    </div>
  );
}

export default Home;