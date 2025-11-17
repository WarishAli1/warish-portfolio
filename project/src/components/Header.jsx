import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/education', label: 'Education' },
    { path: '/projects', label: 'Projects' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' },
  ];

  const linkHoverColor = isDarkMode
    ? "text-purple-400 drop-shadow-[0_0_10px_rgba(128,0,255,0.7)]"
    : "text-black drop-shadow-[0_0_5px_rgba(0,0,0,0.3)]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-black/70 backdrop-blur-md shadow-lg'
            : 'hero-light'
          : 'bg-transparent'
      }`}
    >
      {!isDarkMode && (
        <svg
          className="absolute bottom-0 w-full h-32"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="black"
            fillOpacity="0.05"
            d="M0,192 C360,320 1080,64 1440,192 L1440,320 L0,320 Z"
          ></path>
          <path
            fill="black"
            fillOpacity="0.03"
            d="M0,224 C360,128 1080,288 1440,224 L1440,320 L0,320 Z"
          ></path>
        </svg>
      )}

      {isDarkMode && (
        <>
          <div className="absolute top-0 left-1/4 w-40 h-40 rounded-full blur-3xl animate-pulse mix-blend-screen bg-purple-500/30"></div>
          <div className="absolute bottom-0 right-1/4 w-52 h-52 rounded-full blur-3xl animate-pulse mix-blend-screen bg-blue-500/30"></div>
        </>
      )}

      <div className="relative container-custom py-4 flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl font-bold text-transparent bg-clip-text ${
            isDarkMode
              ? "bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]"
              : "bg-black"
          }`}
        >
          Portfolio
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition-all duration-300 hover:${linkHoverColor} ${
                  isActive ? linkHoverColor : isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </nav>

        <div className="flex items-center md:hidden gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${isDarkMode ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-md shadow-md'}`}
          >
            <div className="container-custom py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `py-2 font-medium transition-all duration-300 hover:${linkHoverColor} ${
                      isActive ? linkHoverColor : isDarkMode ? 'text-gray-300' : 'text-gray-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
