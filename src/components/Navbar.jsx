import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const phoneLink = "https://wa.me/917303747778?text=Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20booking%20a%20free%20demo%20class.";

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' }
  ];

  return (
    <nav className="flex justify-between items-center p-6 bg-soft-pearl shadow-sm sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 tracking-tight">
        <img src="/favicon_io/apple-touch-icon.png" alt="Reet Sangeet logo" className="w-8 h-8" />
        <span className="text-deep-navy">Reet Sangeet</span>
      </Link>
      
      <div className="hidden md:flex gap-8 font-semibold text-deep-navy/80">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className={`hover:text-soothing-teal transition-colors ${location.pathname === link.path ? 'text-soothing-teal border-b-2 border-soothing-teal' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      
      <a 
        href={phoneLink} 
        target="_blank" 
        rel="noreferrer"
        className="bg-sunset-coral text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        Book Demo
      </a>
    </nav>
  );
}

export default Navbar;