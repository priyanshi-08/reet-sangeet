import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Pages
import Home from "./components/Home";
import About from "./components/About";
// import Courses from './pages/Courses';
// import Gallery from './pages/Gallery';
// import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
      </div>
      <Footer />
    </Router>
  );
}

export default App;
