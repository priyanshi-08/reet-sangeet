import React, { useState } from 'react';

const ContactUs = () => {
  const whatsappLink = "https://wa.me/917303747778?text=Hi%20Reet%20Sangeet!%20I%20have%20a%20query.";
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-soft-pearl text-deep-navy py-12 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">Connect With <span className="text-soothing-teal">Us</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Map & WhatsApp */}
          <div className="space-y-8">
            {/* Map Snippet */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-deep-navy/10 h-80 overflow-hidden">
              <h3 className="font-bold mb-3">Our Location</h3>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9576140411264!2d77.1147721!3d28.6309831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03527a9446d3%3A0xc3f9828e67f0f639!2sReet%20Sangeet!5e0!3m2!1sen!2sin!4v1712490000000!5m2!1sen!2sin" 
                className="w-full h-full rounded-lg border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Reet Sangeet Location"
              ></iframe>
            </div>

            {/* WhatsApp CTA Card */}
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200 flex flex-col items-center text-center">
              <div className="bg-green-500 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Chat on WhatsApp</h4>
              <p className="text-deep-navy/70 mb-6">Need a quick response? Message us directly for immediate assistance.</p>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-green-600 transition-all flex items-center gap-2"
              >
                Start Conversation
              </a>
            </div>
          </div>

          {/* Right Column: Email Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-deep-navy/5">
            <h3 className="text-2xl font-bold mb-6">Send an Email</h3>
            
            {/* Netlify Form Integration */}
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-deep-navy/10 focus:border-soothing-teal outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-deep-navy/10 focus:border-soothing-teal outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">How can we help?</label>
                <textarea 
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell us about your interest in music..."
                  className="w-full px-4 py-3 rounded-xl border border-deep-navy/10 focus:border-soothing-teal outline-none resize-none"
                  onChange={handleChange}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-sunset-coral text-white py-4 rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition-all hover:-translate-y-1 active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;