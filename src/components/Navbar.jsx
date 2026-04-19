import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Optional: If you use lucide-react or heroicons, you can replace the spans with icons
// import { Menu, X } from 'lucide-react'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const phoneLink = "https://wa.me/917303747778?text=Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20booking%20a%20free%20demo%20class.";

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-soft-pearl shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center p-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 tracking-tight">
          <img src="/favicon_io/apple-touch-icon.png" alt="Reet Sangeet logo" className="w-8 h-8" />
          <span className="text-deep-navy">Reet Sangeet</span>
        </Link>

        {/* Desktop Links */}
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

        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <a
            href={phoneLink}
            target="_blank"
            rel="noreferrer"
            className="hidden md:block bg-sunset-coral text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-opacity-90 transition-all"
          >
            Book Demo
          </a>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-deep-navy focus:outline-none"
            aria-label="Toggle Menu"
          >
            {/* Simple Hamburger/X logic using spans or SVG */}
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden bg-soft-pearl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4 p-6 border-t border-deep-navy/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)} // Close menu on click
              className={`font-semibold ${location.pathname === link.path ? 'text-soothing-teal' : 'text-deep-navy/80'}`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={phoneLink}
            className="bg-sunset-coral text-white text-center px-6 py-3 rounded-full font-bold mt-2"
          >
            Book Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
