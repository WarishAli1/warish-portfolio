import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import PixelPortrait from "../components/PixelPortrait";

const TIER = {
  name: "clamp(3.5rem, 8vw, 6.75rem)",
  tagline: "clamp(2rem, 4vw, 4.5rem)",
  smallText: "font-mono text-xs uppercase tracking-[0.3em] md:text-[13px]",
};

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const Reveal = ({ delay = 0, children, className = "", style }) => (
  <span className="block overflow-hidden py-[0.06em]">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={`block ${className}`}
      style={style}
    >
      {children}
    </motion.span>
  </span>
);

const Home = () => {
  const { isDarkMode } = useTheme();
  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";
  const ink = isDarkMode ? "text-white" : "text-black";
  const hairline = isDarkMode ? "border-white/20" : "border-black/20";
  const outline = isDarkMode ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)";
  const glow = isDarkMode
    ? "radial-gradient(closest-side at 50% 38%, rgba(148,163,210,0.16), transparent 72%)"
    : "radial-gradient(closest-side at 50% 38%, rgba(0,0,0,0.07), transparent 72%)";

  const links = [
    { to: "/projects", label: "Projects" },
    { to: "/blogs", label: "Writing" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <main
      className={`relative min-h-screen overflow-hidden grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute bottom-0 right-0 z-0 [--photo-h:40vh] max-md:inset-x-0 max-md:flex max-md:justify-center md:right-[11vw] md:[--photo-h:80vh]"
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-x-[25%] -bottom-[4%] -top-[8%] -z-10"
            style={{ background: glow }}
          />
          <PixelPortrait src="/warish.png" alt="Warish Ali" />
        </div>
      </motion.div>

      <section className="container-custom relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-[46vh] pt-28 md:pb-16 md:pt-24">
        <div className="max-w-xl md:max-w-[54%]">
          <motion.p
            {...fadeUp(0.1, 8)}
            className={`mb-4 ${TIER.smallText} ${muted}`}
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            {...fadeUp(0.2, 24)}
            className="select-none font-display italic leading-[0.95] tracking-tight"
            style={{ fontSize: TIER.name }}
          >
            <span className={`block ${ink}`}>Warish</span>
            <span className="block">
              <span
                className="text-stroke"
                style={{ "--stroke-color": isDarkMode ? "#ffffff" : "#000000" }}
              >
                Ali
              </span>
              <span className="text-accent">.</span>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className={`mt-6 ${TIER.smallText} ${muted}`}
          >
            AI/ML &amp; Software Engineer
          </motion.p>

          <motion.div 
            {...fadeUp(0.9, 0)} 
            className={`absolute bottom-[14%] right-0 hidden translate-x-[calc(100%+1.25rem)] flex-col items-center gap-3 md:flex ${muted}`}>
            <span aria-hidden="true" className="h-10 w-px bg-current opacity-40"/>
            <span className="rotate-180 font-mono text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">turning ideas into reality</span>
            <span aria-hidden="true"className="h-1.5 w-1.5 rounded-full bg-current text-accent"/>
          </motion.div>

          <motion.p
            {...fadeUp(0.5)}
            className={`mt-4 max-w-lg text-base leading-relaxed md:text-lg ${muted}`}
          >
            Engineering student focused on AI/ML and software development. I
            enjoy learning how intelligent systems work and turning ideas into
            practical, useful software.
          </motion.p>

          <motion.nav
            {...fadeUp(0.65)}
            aria-label="Primary"
            className={`mt-8 flex max-w-lg flex-wrap items-center gap-x-8 gap-y-3 border-t pt-5 ${hairline}`}
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`group inline-flex items-center gap-1.5 text-base font-medium opacity-70 transition-opacity duration-300 hover:opacity-100 ${ink}`}
              >
                {l.label}
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </motion.nav>
        </div>
      </section>
    </main>
  );
};

export default Home;