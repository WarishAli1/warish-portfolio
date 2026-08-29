import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { techStack, coreStack, familiarStack } from "../components/Technologies";

const Skills = () => {
  const { isDarkMode } = useTheme();
  const [active, setActive] = useState(null);
  const hovered = techStack.find((t) => t.name === active);

  return (
    <main
      className={`min-h-screen grid-bg ${isDarkMode ? "dark-grid" : "light-grid"} overflow-hidden`}
    >
      <section className="px-6 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-6xl mx-auto"
        >
          <h1 className="font-display italic text-6xl sm:text-7xl leading-[0.95] tracking-tight mb-5">
            Stack<span className="not-italic text-accent">.</span>
          </h1>
          <p className={`max-w-xl text-sm sm:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            The tools I use to take ideas from notebook to production.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div
            className={`overflow-hidden rounded-lg border ${
              isDarkMode ? "border-white/10 bg-[#0a0d12]" : "border-black/10 bg-[#fbfbfa]"
            }`}
          >
            <div
              className={`flex items-center gap-2 border-b px-4 py-2.5 ${
                isDarkMode ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span
                className={`ml-2 font-mono text-[11px] tracking-tight ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                warish@stack — ls -la ./skills
              </span>
            </div>

            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <div
                className={`p-6 sm:p-8 font-mono text-sm border-b md:border-b-0 md:border-r ${
                  isDarkMode ? "border-white/10" : "border-black/10"
                }`}
              >
                <p
                  className={`mb-5 text-xs uppercase tracking-[0.2em] ${
                    isDarkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {"// core — drwxr-xr-x"}
                </p>
                <div className="space-y-1">
                  {coreStack.map((tech, i) => {
                    const Icon = tech.icon;
                    const isActive = active === tech.name;
                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        onMouseEnter={() => setActive(tech.name)}
                        onMouseLeave={() => setActive(null)}
                        className={`group flex cursor-default items-center gap-3 rounded-md px-3 py-2.5 transition-colors duration-200 ${
                          isActive
                            ? isDarkMode
                              ? "bg-white/[0.06]"
                              : "bg-black/[0.04]"
                            : ""
                        }`}
                      >
                        <Icon
                          className="h-4 w-4 shrink-0 transition-colors duration-200"
                          style={{
                            color: isActive
                              ? tech.color
                              : isDarkMode
                              ? "#9ca3af"
                              : "#4b5563",
                          }}
                        />
                        <span
                          className={`flex-1 truncate ${
                            isDarkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {tech.name.toLowerCase().replace(/[.\s]/g, "")}
                        </span>
                        <span
                          className={`hidden sm:block h-1 rounded-full transition-all duration-300 ${
                            isActive ? "w-16" : "w-10"
                          }`}
                          style={{
                            backgroundColor: isActive
                              ? tech.color
                              : isDarkMode
                              ? "rgba(255,255,255,0.12)"
                              : "rgba(0,0,0,0.1)",
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 sm:p-8 font-mono text-sm">
                <p
                  className={`mb-5 text-xs uppercase tracking-[0.2em] ${
                    isDarkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {"// also-comfortable — -rw-r--r--"}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {familiarStack.map((tech, i) => {
                    const Icon = tech.icon;
                    const isActive = active === tech.name;
                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.3, delay: 0.15 + i * 0.03 }}
                        onMouseEnter={() => setActive(tech.name)}
                        onMouseLeave={() => setActive(null)}
                        className="group flex cursor-default items-center gap-2 rounded px-2 py-1.5"
                      >
                        <Icon
                          className="h-3.5 w-3.5 shrink-0 transition-colors duration-200"
                          style={{
                            color: isActive
                              ? tech.color
                              : isDarkMode
                              ? "#6b7280"
                              : "#9ca3af",
                          }}
                        />
                        <span
                          className={`truncate text-[13px] transition-colors duration-200 ${
                            isActive
                              ? isDarkMode
                                ? "text-gray-100"
                                : "text-gray-900"
                              : isDarkMode
                              ? "text-gray-500"
                              : "text-gray-500"
                          }`}
                        >
                          {tech.name.toLowerCase().replace(/[.\s]/g, "")}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-between border-t px-4 py-2.5 font-mono text-[11px] ${
                isDarkMode
                  ? "border-white/10 bg-white/[0.02] text-gray-500"
                  : "border-black/10 bg-black/[0.015] text-gray-500"
              }`}
            >
              <span>
                {hovered ? (
                  <>
                    <span style={{ color: hovered.color }}>●</span>{" "}
                    {hovered.tier === "core" ? "core dependency" : "used comfortably"} · {hovered.name}
                  </>
                ) : (
                  `${techStack.length} packages listed`
                )}
              </span>
              <span className="hidden sm:inline">exit 0</span>
            </div>
          </div>
        </div>
      </section>

      <div className="relative inset-0 pointer-events-none flex items-end mt-8">
        <div className="w-full px-6 pb-4">
          <span
            className={`font-black select-none block ${
              isDarkMode ? "text-gray-200" : "text-ink"
            }`}
            style={{
              fontSize: "clamp(60px, 10vw, 120px)",
              lineHeight: "1",
              whiteSpace: "nowrap",
              opacity: 0.08,
              transform: "translateX(-3%)",
            }}
          >
            STACK.
          </span>
        </div>
      </div>
    </main>
  );
};

export default Skills;