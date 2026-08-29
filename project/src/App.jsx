import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import GlowFollower from "./context/GlowFollower";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";

import PortfolioChat from "./components/PortfolioChat";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <GlowFollower />
      <ScrollToTop />
      <Header />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <PortfolioChat />
    </div>
  );
}

export default App;