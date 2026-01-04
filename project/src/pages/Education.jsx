import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Education = () => {
  const { isDarkMode } = useTheme();

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      }`}
    >
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1
            className={`text-4xl sm:text-5xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Education
          </h1>
          <p
            className={`max-w-xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Academic journey and formal learning timeline.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className={`absolute left-1/2 top-0 h-full w-px transform -translate-x-1/2 ${
              isDarkMode ? "bg-white/10" : "bg-black/10"
            }`}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-24"
          >
            <div className="md:text-right">
              <span
                className={`inline-block text-sm tracking-wide ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                2023 — Present
              </span>
            </div>

            <div
              className={`relative border rounded-xl p-8 ${
                isDarkMode
                  ? "bg-black/20 border-white/10"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <span
                className={`absolute -left-3 top-8 w-3 h-3 ${
                  isDarkMode ? "bg-white" : "bg-black"
                }`}
              />

              <h2
                className={`text-xl font-medium mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Bachelor of Computer Engineering
              </h2>

              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Advanced College of Engineering and Management
              </p>

              {/* <ul
                className={`space-y-2 text-sm list-disc list-inside ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>Strong foundation in computer engineering</li>
                <li>Focus on programming, algorithms, and systems</li>
                <li>Exploring machine learning and applied AI</li>
              </ul> */}
            </div>
          </motion.div>
          
          <motion.div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="md:text-right text-gray-400">2026</div>
            <div className="border rounded-xl p-8 opacity-50">
              Coming soon
            </div>
          </motion.div>
        </div>
      </section>
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
            transform: "translateX(-3%)"
          }}
        >
          EDUCATION.
        </span>
      </div>
    </div>
    </main>
  );
};

export default Education;
