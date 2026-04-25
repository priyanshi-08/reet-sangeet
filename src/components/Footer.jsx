import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const whatsappMsg = "Hi%20Reet%20Sangeet!%20I%20am%20interested%20in%20booking%20a%20free%20demo%20class.";
  const phoneLink = `https://wa.me/917303747778?text=${whatsappMsg}`;

  return (
    <footer className="bg-deep-navy text-soft-pearl pt-20 pb-8 px-6 border-t-[6px] border-sunset-coral mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: About */}
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold flex items-center gap-3 tracking-tight mb-6 text-white hover:text-soothing-teal transition-colors"
          >
            <img src="/favicon_io/apple-touch-icon.png" alt="Reet Sangeet logo" className="w-8 h-8 shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span>Reet Sangeet</span>
              <span className="text-sm font-semibold text-soft-pearl/75 tracking-wide normal-case">
                Music Academy
              </span>
            </span>
          </Link>
          <p className="text-soft-pearl/70 leading-relaxed mb-6">
            Creating a welcoming space where students of all ages can explore their musical passion, build confidence, and find their unique voice in Gurugram.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4 font-medium text-soft-pearl/80">
            <li><Link to="/" className="hover:text-soothing-teal hover:pl-2 transition-all block">Home</Link></li>
            <li><Link to="/about" className="hover:text-soothing-teal hover:pl-2 transition-all block">Our Story</Link></li>
            <li><Link to="/courses" className="hover:text-soothing-teal hover:pl-2 transition-all block">Courses We Offer</Link></li>
            <li><a href="#testimonies" className="hover:text-soothing-teal hover:pl-2 transition-all block">Reviews</a></li>
            <li>
              <a href={phoneLink} target="_blank" rel="noreferrer" className="text-sunset-coral font-bold hover:text-white transition-colors block mt-2">
                Book a Free Demo →
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
          <ul className="space-y-6 text-soft-pearl/80">
            <li className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-soothing-teal text-xl mt-1 shrink-0" />
              <p className="leading-relaxed">
                Eurokids preschool society,<br />
                near Gurgaon One, Sector 84,<br />
                Gurugram, Haryana 122012
              </p>
            </li>
            <li className="flex items-center gap-4">
              <FaPhoneAlt className="text-soothing-teal text-xl shrink-0" />
              <a href="tel:+917303747778" className="hover:text-white transition-colors font-semibold text-lg">
                +91 73037 47778
              </a>
            </li>
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-soothing-teal text-xl shrink-0" />
              <a href="mailto:contact@reetsangeet.com" className="hover:text-white transition-colors">
                contact@reetsangeet.com
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Social QR Codes */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Connect With Us</h3>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-white rounded-xl shadow-md border-2 border-transparent hover:border-sunset-coral transition-colors">
                <QRCode value="https://www.instagram.com/reetsangeetmusic/" size={80} fgColor="#292F36" />
              </div>
              <a href="https://www.instagram.com/reetsangeetmusic/" target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-soft-pearl/80 hover:text-sunset-coral transition-colors">
                <FaInstagram className="text-lg" /> Instagram
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-2 bg-white rounded-xl shadow-md border-2 border-transparent hover:border-soothing-teal transition-colors">
                <QRCode value="https://www.facebook.com/reetsangeet.reetsangeetmusicacademy" size={80} fgColor="#292F36" />
              </div>
              <a href="https://www.facebook.com/reetsangeet.reetsangeetmusicacademy" target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-soft-pearl/80 hover:text-soothing-teal transition-colors">
                <FaFacebookF className="text-lg" /> Facebook
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-soft-pearl/50">
        <p>© {new Date().getFullYear()} Reet Sangeet Music Academy. All rights reserved.</p>
        <p className="bg-white/5 px-4 py-1.5 rounded-full border border-white/5 text-soft-pearl/70 font-medium tracking-wide">
          Founder: <span className="text-white font-bold">Ruchi Vashistha</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;