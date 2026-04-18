import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
// import Courses from './pages/Courses';
// import Gallery from './pages/Gallery';
// import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-soft-pearl text-deep-navy font-sans selection:bg-soothing-teal selection:text-white">
        
        {/* Navbar stays at the top of every page */}
        <Navbar />

        {/* Routes load the specific page content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <Route path="/courses" element={<Courses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} /> 
          */}
        </Routes>
        
        {/* You can also extract your footer to src/components/Footer.jsx and place it here */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;