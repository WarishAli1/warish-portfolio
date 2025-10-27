import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import skills from "../data/skills";
import { useTheme } from "../context/ThemeContext";

const skillColorsLight = [
  { bg: "bg-gray-100", border: "border-gray-300", text: "font-bold text-black", line: "bg-gray-400" },
  { bg: "bg-gray-200", border: "border-gray-400", text: "font-bold text-black", line: "bg-gray-500" },
  { bg: "bg-gray-100", border: "border-gray-300", text: "font-bold text-black", line: "bg-gray-400" },
  { bg: "bg-gray-200", border: "border-gray-400", text: "font-bold text-black", line: "bg-gray-500" },
  { bg: "bg-gray-100", border: "border-gray-300", text: "font-bold text-black", line: "bg-gray-400" },
];

const Home = () => {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? "text-white" : "text-black";
  const secondaryTextColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const bgGradient = isDarkMode
    ? "bg-gradient-to-b from-[#0a0a1f] via-[#101035] to-[#1a1a4a]"
    : "bg-gray-100";

  return (
    <div className={`relative min-h-screen overflow-hidden ${bgGradient}`}>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight ${textColor}`}>
              Hi, I’m{" "}
              <span className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight ${
            isDarkMode
              ? "from-purple-400 to-blue-400 drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]"
              : "text-black"
          }`}>
                Warish Ali
              </span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${secondaryTextColor}`}>
              A passionate full-stack developer creating beautiful, functional, user-centered digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/projects"
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isDarkMode
                  ? "bg-white/10 border border-white/20 shadow-lg hover:shadow-fuchsia-400/30 hover:bg-white/20"
                  : "bg-gray-200 border border-gray-400 shadow-md hover:shadow-gray-400 text-black font-bold"
                }`}
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-300 ${isDarkMode
                  ? "border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white"
                  : "border-black text-black bg-white/20 backdrop-blur-md shadow-md hover:bg-white/30 font-bold"
                }`}
                style={!isDarkMode ? { backdropFilter: "blur(12px)" } : {}}
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container-custom mx-auto relative">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${isDarkMode ? "text-indigo-400" : "text-black"}`}>
            My Skills
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-10 justify-center">
            {skills.map((group, idx) => {
              const color = isDarkMode
                ? { bg: "bg-white/5", border: "border-white/10", text: "text-indigo-400 font-semibold", line: "bg-indigo-500/30" }
                : skillColorsLight[idx % skillColorsLight.length];

              return (
                <div key={idx} className="relative mb-12 md:mb-0 flex-1">
                  <div className={`absolute left-5 top-0 h-full w-1 rounded-full ${color.line}`}></div>
                  {group.items.map((skill, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="mb-10 ml-8 relative"
                    >
                      <div
                        className={`absolute w-4 h-4 rounded-full -left-6 top-1/2 -translate-y-1/2 border-2 ${isDarkMode ? "border-indigo-200 bg-indigo-400" : "border-gray-500 bg-gray-500"}`}
                      ></div>
                      <div
                        className={`p-4 md:p-5 rounded-tl-xl rounded-br-xl shadow-md transition-transform duration-300 ${color.bg} ${color.border}`}
                      >
                        <p className={`${color.text} text-sm md:text-base mb-1`}>
                          {group.category}
                        </p>
                        <p className={isDarkMode ? "text-white text-xs md:text-sm" : "text-black text-xs md:text-sm font-bold"}>{skill}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 overflow-hidden">
        <div className={`absolute inset-0 transform -skew-y-2 opacity-40 ${isDarkMode ? "bg-gradient-to-tr from-fuchsia-700 via-purple-600 to-indigo-500" : "bg-gray-900"}`}></div>
        <div className="relative container-custom text-center py-16">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>
            Ready to Start Your Project?
          </h2>
          <p className={`text-lg mb-8 ${isDarkMode ? "text-white/90" : "text-black font-bold"}`}>
            I’m available for freelance work and open to new opportunities.
          </p>
          <Link
            to="/contact"
            className={`inline-flex items-center px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${isDarkMode
              ? "bg-white/10 backdrop-blur-xl border border-white/20 hover:shadow-blue-400/40 hover:bg-white/20"
              : "bg-white/30 text-black border-white/25 backdrop-blur-xl hover:bg-white/40 shadow-md"
            }`}
            style={!isDarkMode ? { backdropFilter: "blur(12px)" } : {}}
          >
            Let's Talk <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
