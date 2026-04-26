import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // <-- 1. Added SEO Provider

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Pages
import Home from "./components/Home";
import About from "./components/About";
import Courses from "./components/Courses";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

// Automatically scrolls to the top of the page when navigating to a new route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    // 2. Wrap the Router inside the HelmetProvider
    <HelmetProvider>
      <Router>
        <ScrollToTop />

        {/* 3. Setup flexbox to keep the footer pinned to the bottom */}
        <div className="flex flex-col min-h-screen bg-soft-pearl text-deep-navy font-sans selection:bg-soothing-teal selection:text-white">
          <Navbar />

          {/* 4. main tag with flex-grow expands to fill all empty space above the footer */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* 5. Footer is now safely inside the layout container */}
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
