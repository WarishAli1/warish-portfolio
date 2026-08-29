import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import PortraitTerminal from "../components/PortraitTerminal";

const TYPE_TEXT = "render --face warish.jpg";

const usePromptTyping = (active) => {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (!active) {
      setTyped("");
      setDone(false);
      return;
    }
    let i = 0;
    const tick = () => {
      i += 1;
      setTyped(TYPE_TEXT.slice(0, i));
      if (i < TYPE_TEXT.length) {
        timeoutRef.current = setTimeout(tick, 28 + Math.random() * 35);
      } else {
        setDone(true);
      }
    };
    timeoutRef.current = setTimeout(tick, 120);
    return () => clearTimeout(timeoutRef.current);
  }, [active]);

  return { typed, done };
};
export default function About() {
  const { isDarkMode } = useTheme();
  const [portraitHover, setPortraitHover] = useState(false);
  const { typed, done } = usePromptTyping(portraitHover);

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid bg-ink text-gray-200" : "light-grid bg-paper text-ink"
      }`}
    >
      
      <section className="container-custom max-w-6xl py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-display italic text-6xl sm:text-7xl leading-[0.95] tracking-tight">
            About<span className="not-italic text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm sm:text-base opacity-70">
            A little context about my background, interests, and direction.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-10 rounded-xl border ${
              isDarkMode
                ? "border-white/10 bg-black/10"
                : "border-black/10 bg-white/10"
            } shadow-soft`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                onMouseEnter={() => setPortraitHover(true)}
                onMouseLeave={() => setPortraitHover(false)}
                className={`group relative w-56 overflow-hidden rounded-xl border transition-all duration-500 hover:-translate-y-1 ${
                  isDarkMode
                    ? "border-white/15 bg-[#0a0d12] shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
                    : "border-black/15 bg-[#f4f4f2] shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]"
                } mb-6`}
              >
                {/* window chrome — status dot reflects actual render state, not just hover */}
                <div
                  className={`flex items-center gap-1.5 border-b px-3 py-1.5 ${
                    isDarkMode ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-[#ff5f56] transition-shadow duration-300 group-hover:shadow-[0_0_6px_#ff5f56]" />
                  <span className="h-2 w-2 rounded-full bg-[#ffbd2e] transition-shadow duration-300 group-hover:shadow-[0_0_6px_#ffbd2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#27c93f] transition-shadow duration-300 group-hover:shadow-[0_0_6px_#27c93f]" />
                  <span
                    className={`ml-2 font-mono text-[9px] uppercase tracking-widest ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    portrait.jpg
                  </span>
                  <span className="ml-auto flex items-center gap-1">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        portraitHover && !done
                          ? isDarkMode
                            ? "bg-amber-400 animate-pulse"
                            : "bg-amber-500 animate-pulse"
                          : portraitHover && done
                          ? isDarkMode
                            ? "bg-emerald-400"
                            : "bg-emerald-500"
                          : isDarkMode
                          ? "bg-gray-700"
                          : "bg-gray-300"
                      }`}
                    />
                  </span>
                </div>

                <div className="relative h-56 w-56">
                  <img
                    src="/warish.JPEG"
                    alt="Warish Ali"
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      done ? "scale-105 opacity-0" : "opacity-100"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      done ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <PortraitTerminal src="/warish.JPEG" bare />
                  </div>
                </div>

                <div
                  className={`flex min-h-[34px] items-center gap-1.5 border-t px-3 py-2 font-mono text-[11px] ${
                    isDarkMode
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-black/10 bg-black/[0.02]"
                  }`}
                >
                  <span className={isDarkMode ? "text-emerald-400/70" : "text-emerald-600/70"}>$</span>
                  {portraitHover ? (
                    <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
                      {typed}
                      {!done && (
                        <span
                          className={`ml-0.5 inline-block h-3 w-1.5 animate-pulse align-middle ${
                            isDarkMode ? "bg-emerald-400" : "bg-emerald-600"
                          }`}
                        />
                      )}
                      {done && (
                        <span
                          className={`ml-1.5 italic ${
                            isDarkMode ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        >
                          → done
                        </span>
                      )}
                    </span>
                  ) : (
                    <span
                      className={`italic ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    >
                      hover to render
                    </span>
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-bold">Warish Ali</h2>
              <p className="uppercase tracking-wide text-sm text-muted mt-1">
                AI/ML & Software Developer
              </p>

              <p className="mt-3 text-sm text-muted">
                Kathmandu, Nepal · ✉️ warishali.contact@gmail.com
              </p>

              <a
                href="/resume.pdf"
                download="Warish_Ali_Resume.pdf"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-black dark:border-white rounded-md font-medium transition hover:-translate-y-0.5"
              >
                <FiDownload /> Download Resume
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`p-10 rounded-xl border leading-relaxed ${
              isDarkMode
                ? "border-white/10 bg-black/10"
                : "border-black/10 bg-white/10"
            } shadow-soft`}
          >
        
          <p className="mb-6">
            I am an undergraduate Computer Engineering student at Advance College of
            Engineering and Management (ACEM), Kathmandu.
          </p>

          <p className="mb-6">
            I work as a{" "}
            <span className="font-medium">Full-Stack Java Developer</span> with
            experience in Java, Vue.js, backend systems, APIs, and databases. Through
            practical projects, I have gained experience building software that is
            functional, scalable, and user-focused.
          </p>

          <p className="mb-6">
            Currently, I am exploring{" "}
            <span className="font-medium">Machine Learning</span> and expanding my
            understanding of how intelligent systems learn from data. I enjoy learning
            new concepts, experimenting with different technologies, and applying them
            through hands-on projects.
          </p>

          <p className="mb-6">
            I am naturally curious about how systems work, from the underlying logic to
            the complete solutions people interact with every day. For me, technology is
            a continuous learning journey, and I am always looking for opportunities to
            grow, build, and improve.
          </p>

          <p>
            Outside of tech, I enjoy writing poems and songs, and I also enjoy singing.
          </p>

          </motion.div>
        </div>
      </section>
    </main>
  );
}