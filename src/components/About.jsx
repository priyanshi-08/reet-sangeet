import React from 'react';
import banner3 from '../assets/banner/banner3.jpg';
import banner4 from '../assets/banner/banner4.jpg';

const AboutUs = () => {
  return (
    <div className="bg-soft-pearl text-deep-navy">
      {/* Hero / Intro Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase text-soothing-teal mb-4">
          Our Story
        </h2>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
          Where Tradition Meets <br />
          <span className="text-sunset-coral">Modern Rhythm</span>
        </h1>
        <p className="text-lg md:text-xl text-deep-navy/70 max-w-3xl mx-auto leading-relaxed">
          At Reet Sangeet, we believe music isn't just a skill—it's a language of the soul. 
          Founded on the principles of "Reet" (Tradition) and "Sangeet" (Music), we bridge 
          the gap between classical roots and contemporary aspirations.
        </p>
      </section>

      {/* Philosophy Section - Alternating Layout */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
             {/* Replace with an actual photo of the academy */}
            <img 
              src={banner4} 
              alt="Music Academy Atmosphere" 
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Why We Started</h3>
            <p className="text-deep-navy/80 text-lg">
              Located in the heart of Sector 84, Gurugram, Reet Sangeet was born out of 
              a desire to provide a nurturing space for aspiring musicians of all ages. 
              Whether you are picking up an instrument for the first time or looking to 
              master your craft, our expert mentors are here to guide you.
            </p>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-soothing-teal">
                <span className="block font-bold text-2xl">500+</span>
                <span className="text-sm text-deep-navy/60">Students Taught</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-sunset-coral">
                <span className="block font-bold text-2xl">10+</span>
                <span className="text-sm text-deep-navy/60">Expert Mentors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision / Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center flex-row-reverse">
          <div className="order-2 md:order-1 space-y-6">
            <h3 className="text-3xl font-bold">Our Philosophy</h3>
            <p className="text-deep-navy/80 text-lg">
              We don't believe in "one size fits all" teaching. Our curriculum is tailored 
              to the individual pace of each student. From Hindustani Classical to 
              Western Pop, we ensure the technical foundation is strong while keeping 
              the joy of music alive.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 font-semibold">
                <span className="w-2 h-2 rounded-full bg-soothing-teal"></span>
                Individual Attention & Small Batches
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <span className="w-2 h-2 rounded-full bg-soothing-teal"></span>
                Performance-Oriented Learning
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <span className="w-2 h-2 rounded-full bg-soothing-teal"></span>
                Free Demo Sessions for Beginners
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src={banner3} 
              alt="Live Music Teaching" 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-deep-navy py-16 px-6 text-center text-white mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your rhythm?</h2>
        <p className="mb-10 text-white/70 max-w-xl mx-auto">
          Join the Reet Sangeet family today and start your musical journey with a free demo class.
        </p>
        <button className="bg-sunset-coral hover:bg-white hover:text-sunset-coral text-white px-10 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1">
          Explore Our Courses
        </button>
      </section>
    </div>
  );
};

export default AboutUs;