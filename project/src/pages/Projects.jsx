import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import projects from "../data/projects";
import ProjectDrawer from "./ProjectDrawer";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [activeProject, setActiveProject] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);

  const border = isDarkMode ? "border-white/10" : "border-black/10";
  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const move = (e) => {
    x.set(e.clientX + 28);
    y.set(e.clientY - 90);
  };

  const enterRow = (e, p) => {
    if (!visible) {
      x.set(e.clientX + 28);
      y.set(e.clientY - 90);
      sx.jump?.(e.clientX + 28);
      sy.jump?.(e.clientY - 90);
    }
    setHovered(p);
    setVisible(true);
  };

  return (
    <main
      className={`min-h-screen grid-bg ${isDarkMode ? "dark-grid" : "light-grid"}`}
    >
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h1
            className={`font-display italic text-6xl sm:text-7xl leading-[0.95] tracking-tight mb-5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Projects<span className="not-italic text-accent">.</span>
          </h1>
          <p className={`max-w-xl text-sm sm:text-base ${muted}`}>
            Projects across AI/ML, software engineering and applied research.
          </p>
        </motion.div>

        <div
          className={`border-t ${border}`}
          onMouseMove={move}
          onMouseLeave={() => setVisible(false)}
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              onMouseEnter={(e) => enterRow(e, p)}
              onClick={() => setActiveProject(p)}
              className={`index-row group relative grid grid-cols-[auto_1fr_auto] gap-x-5 sm:gap-x-10 items-center py-7 sm:py-8 border-b ${border} cursor-pointer transition-opacity duration-300 ${
                visible && hovered?.id !== p.id ? "sm:opacity-40" : ""
              }`}
            >
              <span className="index-num font-display text-4xl sm:text-6xl leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="block min-w-0">
                <h2
                  className={`font-display text-xl sm:text-2xl leading-snug title-underline ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {p.title}
                </h2>

                {p.status === "ongoing" && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                          isDarkMode ? "bg-amber-400" : "bg-amber-500"
                        }`}
                      />
                      <span
                        className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                          isDarkMode ? "bg-amber-400" : "bg-amber-500"
                        }`}
                      />
                    </span>
                    <span
                      className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      In development
                    </span>
                  </div>
                )}

                <div className="grid transition-all duration-300 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className={`pt-2 text-sm leading-relaxed ${muted}`}>
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* small thumbnail only on touch/mobile, where there's no cursor */}
              <img
                src={p.images?.[0]}
                alt=""
                loading="lazy"
                className={`sm:hidden h-14 w-20 rounded-sm border object-cover ${
                  isDarkMode ? "border-white/15" : "border-black/10"
                }`}
              />
            </motion.article>
          ))}
        </div>
      </section>

      {/* Floating cursor-following preview (desktop only) */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
        transition={{ duration: 0.25 }}
        className="hidden sm:block fixed top-0 left-0 z-50 pointer-events-none"
      >
        <div
          className={`relative h-44 w-72 overflow-hidden rounded-md border shadow-[0_24px_50px_-12px_rgba(0,0,0,0.55)] ${
            isDarkMode
              ? "border-white/20 bg-neutral-900"
              : "border-black/15 bg-white"
          }`}
        >
          <AnimatePresence initial={false}>
            {hovered && (
              <motion.img
                key={hovered.id}
                src={hovered.images?.[0]}
                alt=""
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="relative inset-0 pointer-events-none flex items-end">
        <div className="w-full px-6 pb-4">
          <span
            className={`font-black select-none ${
              isDarkMode ? "text-gray-200" : "text-ink"
            }`}
            style={{
              fontSize: window.innerWidth < 768 ? "60px" : "120px",
              lineHeight: "1",
              whiteSpace: "nowrap",
              opacity: 0.08,
              display: "block",
              textAlign: "left",
              transform: "translateX(-3%)",
            }}
          >
            PROJECTS.
          </span>
        </div>
      </div>

      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
};
export default Projects;