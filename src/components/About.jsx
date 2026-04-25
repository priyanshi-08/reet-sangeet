import React from 'react';
import collage1 from '../assets/about/aboutcollage1.jpg';
import collage2 from '../assets/about/aboutcollage2.jpg';
import founder from '../assets/about/founder.jpeg'
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-soft-pearl text-deep-navy">
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

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Replace with an actual photo of the academy */}
            <img
              src={collage2}
              alt="Music Academy Atmosphere"
              className="w-full h-[400px] object-cover py-4"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Why We Started</h3>
            <p className="text-deep-navy/80 text-lg">
              Located in the heart of Sector 84, Gurugram, Reet Sangeet, established in 2019, was born out of
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
          <div className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 p-2">
            <img
              src={collage1}
              alt="Live Music Teaching"
              className="w-full h-[400px] object-cover py-2"
            />
          </div>
        </div>
      </section>
      {/* Founder Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row items-center border border-deep-navy/5">

          {/* Founder Photo Placeholder */}
          <div className="w-full md:w-1/3 h-[400px] bg-soothing-teal/10 relative overflow-hidden">
            <img
              src={founder}
              alt="Founder of Reet Sangeet"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Message Content */}
          <div className="w-full md:w-2/3 p-10 md:p-16 relative">
            {/* Decorative Quote Icon */}
            <div className="absolute top-8 right-12 text-soothing-teal opacity-20">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H11.017V4H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.01701 21L3.01701 18C3.01701 16.8954 3.91244 16 5.01701 16H8.01701C8.56929 16 9.01701 15.5523 9.01701 15V9C9.01701 8.44772 8.56929 8 8.01701 8H4.01701C3.46472 8 3.01701 8.44772 3.01701 9V11C3.01701 11.5523 2.56929 12 2.01701 12H0.01701V4H10.017V15C10.017 18.3137 7.33072 21 4.01701 21H3.01701Z" />
              </svg>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-soothing-teal mb-4">
              A Note from the Founder
            </h3>

            <p className="text-2xl md:text-3xl font-bold text-deep-navy leading-tight mb-6 italic">
              "Music isn't about perfection; it's about the courage to express what words cannot."
            </p>

            <p className="text-deep-navy/70 text-lg leading-relaxed mb-8">
              Growing up, music was the thread that connected my traditions to my dreams.
              I founded Reet Sangeet to be a home for every curious mind in New Gurugram, where
              technical mastery meets the pure joy of creation. We don't just teach
              notes; we build confidence.
            </p>

            <div>
              <h4 className="text-xl font-extrabold text-deep-navy">Ruchi Kaushik Vashistha</h4>
              <p className="text-soothing-teal font-semibold">Founder</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep-navy py-16 px-6 text-center text-white mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your rhythm?</h2>
        <p className="mb-10 text-white/70 max-w-xl mx-auto">
          Join the Reet Sangeet family today and start your musical journey with a free demo class.
        </p>
        <Link to="/courses" className="bg-sunset-coral hover:bg-white hover:text-sunset-coral text-white px-10 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1">
          Explore Our Courses
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;