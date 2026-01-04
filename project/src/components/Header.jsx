import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navClass = ({ isActive }) =>
    `text-sm transition ${
      isActive
        ? "font-semibold underline"
        : "hover:underline"
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 ${
        isDarkMode ? "bg-ink/80" : "bg-paper/80"
      } backdrop-blur border-b ${
        isDarkMode ? "border-white/10" : "border-black/10"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16">
        <Link className="font-bold text-lg" to="/">
          Warish
        </Link>

        <nav className="hidden md:flex gap-6">
          {["/", "/about", "/education", "/projects", "/blogs", "/contact"].map((p, i) => (
            <NavLink key={i} to={p} className={navClass}>
              {p === "/" ? "Home" : p.slice(1)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {open && (
  <div
    className={`md:hidden px-6 py-4 space-y-4 ${
      isDarkMode ? "bg-ink border-white/10" : "bg-paper border-black/10"
    } border-t`}
  >
    {["/", "/about", "/education", "/projects", "/blogs", "/contact"].map(
      (p, i) => (
        <NavLink
          key={i}
          to={p}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `block text-sm ${
              isActive ? "font-semibold underline" : "opacity-80"
            }`
          }
        >
          {p === "/" ? "Home" : p.slice(1)}
        </NavLink>
      )
    )}
  </div>
)}
    </header>
  );
};

export default Header;
