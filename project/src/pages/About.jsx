import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import NeonLinesBackground from "../context/NeonLinesBackground";
export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDarkMode ? "bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white" : "hero-light"}`}>
      {isDarkMode && <NeonLinesBackground />}
      
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.h1
          className={`text-5xl font-extrabold text-center mb-4 ${isDarkMode ? "drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]" : "text-black"}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Me
        </motion.h1>

        <p className={`text-center mb-16 text-lg ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
          Get to know who I am beyond just the code.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-10 flex flex-col items-center text-center rounded-2xl shadow-lg ${isDarkMode ? "bg-white/5 backdrop-blur-xl border border-white/10" : "bg-white/30 border border-gray-300 shadow-md backdrop-blur-md"}`}
            style={!isDarkMode ? { backdropFilter: "blur(15px)" } : {}}
          >
            <motion.div
              className="relative w-52 h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <img
                src="/warish.HEIC"
                alt="Warish Ali"
                className="object-cover w-full h-full rounded-2xl relative z-10"
              />
            </motion.div>

            <h2 className={`mt-6 text-3xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Warish Ali</h2>
            <p className={`text-sm font-bold mt-1 uppercase tracking-wide ${isDarkMode ? "text-purple-400" : "font-bold"}`}>
              Software Engineer
            </p>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-800"} mt-2`}>
              Kathmandu, Nepal · ✉️ warishkhan384@gmail.com
            </p>

            <motion.a
              href="/resume.pdf"
              download="Warish_Ali_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`mt-8 inline-flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg"
                  : "bg-white/40 text-black border border-white/30 backdrop-blur-xl hover:shadow-purple-400/40 hover:bg-white/50 shadow-md"
              }`}
              style={!isDarkMode ? { backdropFilter: "blur(20px)" } : {}}
            >
              <FiDownload className="mr-2" /> Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-10 leading-relaxed text-lg rounded-2xl shadow-lg ${isDarkMode ? "bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300" : "bg-white/30 border border-gray-300 shadow-md text-gray-800 backdrop-blur-md"}`}
            style={!isDarkMode ? { backdropFilter: "blur(12px)" } : {}}
          >
            <p className="mb-6">
              I’m a developer who enjoys building applications that work well
              and actually solve problems. I’ve worked with{" "}
              <span className={`${isDarkMode ? "text-purple-400" : "font-bold"}`}>Java, Vue.js, and Spring Boot</span>{" "}
              — not my main focus, but tools I like using to connect ideas from
              front to back.
            </p>
            <p>
              Lately, I’ve been exploring{" "}
              <span className={`${isDarkMode ? "text-blue-400" : "font-bold"}`}>machine learning with PyTorch</span>,
              diving into CNNs, neural networks, and computer vision. For me,
              it’s less about sticking to one stack and more about learning,
              experimenting, and turning concepts into real, impactful software.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
