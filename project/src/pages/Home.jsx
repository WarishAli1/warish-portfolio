import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDarkMode } = useTheme();
  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";
  const ink = isDarkMode ? "text-white" : "text-black";

  const links = [
    { to: "/projects", label: "Projects" },
    { to: "/blogs", label: "Writing" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <main
      className={`min-h-screen grid-bg ${isDarkMode ? "dark-grid" : "light-grid"}`}
    >
      <section className="container-custom mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24 pb-16">
        <div className="relative grid grid-cols-1 items-center gap-y-10 md:grid-cols-12">
          <div className="relative z-10 md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 font-mono text-xs uppercase tracking-[0.35em] md:text-sm ${muted}`}
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display italic select-none leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 9vw, 6.75rem)" }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className={`mt-8 font-mono text-xs uppercase tracking-[0.25em] md:text-sm ${muted}`}
            >
              AI/ML &amp; Software Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className={`mt-5 max-w-lg text-base leading-relaxed md:text-lg ${muted}`}
            >
              Engineering student focused on AI/ML and software development. I
              enjoy learning how intelligent systems work and turning ideas
              into practical, useful software.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`group inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? "border-white/40 text-white hover:border-white hover:bg-white/5"
                      : "border-black/40 text-black hover:border-black hover:bg-black/5"
                  }`}
                >
                  {l.label}
                  <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </motion.div>
          </div>

          <div className="relative z-0 flex justify-center md:col-span-5 md:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -2.5 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className={`absolute -bottom-4 -right-4 h-full w-full rounded-sm border md:-bottom-5 md:-right-5 ${
                  isDarkMode ? "border-white/25" : "border-black/25"
                }`}
              />
              <img
                src="/warish.png"
                alt="Warish Ali"
                draggable={false}
                className={`relative h-64 w-auto max-w-[280px] select-none rounded-sm object-cover md:h-80 ${
                  isDarkMode
                    ? "grayscale contrast-125 brightness-110"
                    : "grayscale contrast-110"
                }`}
              />
              <span
                className={`absolute -left-3 bottom-3 flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-[11px] normal-case tracking-tight shadow-md md:-left-4 ${
                  isDarkMode
                    ? "border-white/15 bg-[#12161d]"
                    : "border-black/10 bg-white"
                }`}
              >
                <span className={isDarkMode ? "text-emerald-400/70" : "text-emerald-600/70"}>//</span>
                <span
                  className={`italic ${
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  turning ideas into reality
                </span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;