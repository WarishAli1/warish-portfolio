
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { layers, SOURCES } from "../components/Technologies";

const SourceMark = ({ source, accent }) => {
  const s = SOURCES[source];
  if (!s?.mark) return null;

  return (
    <span title={s.label} aria-label={s.label} style={{ color: accent }}>
      {s.mark}
    </span>
  );
};

const Legend = ({ accent, dark }) => {
  const marked = Object.values(SOURCES).filter((s) => s.mark);
  const unmarked = Object.values(SOURCES).filter((s) => !s.mark);

  return (
    <p
      className={`mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs ${
        dark ? "text-gray-300" : "text-gray-700"
      }`}
    >
      {marked.map((s) => (
        <span key={s.label}>
          <span style={{ color: accent }}>{s.mark}</span> {s.label}
        </span>
      ))}
      {unmarked.map((s) => (
        <span key={s.label}>
          no mark = {s.label.toLowerCase()}
        </span>
      ))}
    </p>
  );
};


const SkillsGrid = ({ accent, dark }) => {
  const border = dark ? "border-white/15" : "border-black/15";

  return (
    <div className={`border-y ${border}`}>
      {layers.map((layer, li) => (
        <motion.section
          key={layer.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: li * 0.05 }}
          className={`grid gap-8 py-12 md:grid-cols-2 md:gap-14 ${
            li > 0 ? `border-t ${border}` : ""
          }`}
        >
          <div>
            <span
              className={`font-mono text-xs font-medium uppercase tracking-[0.2em] ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {layer.label}
            </span>

            <p
              className={`mt-5 max-w-md font-display text-2xl leading-snug sm:text-3xl ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              {layer.blurb}
            </p>
          </div>

          <ul className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4">
            {layer.items.map((t) => {
              const Icon = t.icon;

              return (
                <li
                  key={t.name}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Icon
                    className="h-8 w-8"
                    style={{ color: t.color }}
                  />

                  <span
                    className={`text-xs ${
                      dark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.name}{" "}
                    <SourceMark source={t.source} accent={accent} />
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.section>
      ))}
    </div>
  );
};

const Skills = () => {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? "#f0b04a" : "#92400e";

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      } overflow-hidden`}
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

          <p
            className={`max-w-xl text-sm sm:text-base ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            The tools I use to take ideas from notebook to production.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <SkillsGrid accent={accent} dark={isDarkMode} />
          <Legend accent={accent} dark={isDarkMode} />
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
