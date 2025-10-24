import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import skills from "../data/skills";
const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a0a1f] via-[#101035] to-[#1a1a4a] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-10 w-72 h-72 bg-fuchsia-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600/20 blur-[150px] rounded-full animate-pulse delay-2000" />
      </div>

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-center">
              Hi, I’m{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,0,255,0.6)] relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-blue-400 after:rounded-full">
                Warish Ali
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              A passionate full-stack developer specializing in creating beautiful, functional, and user-centered digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 rounded-xl font-semibold bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-fuchsia-400/30 hover:bg-white/20 transition-all duration-300"
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl font-semibold border border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative z-10 py-20">
        <div className="container-custom mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-indigo-400">
            My Skills
          </h2>

          <div className="flex flex-col md:flex-row md:space-x-10 justify-center">
            {skills.map((group, idx) => (
              <div key={idx} className="relative mb-12 md:mb-0 flex-1">
                <div className="absolute left-5 top-0 h-full w-1 bg-indigo-500/30 rounded-full"></div>

                {group.items.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(128, 0, 255, 0.6)",
                    }}
                    className="mb-10 ml-8 relative group"
                  >
        
                    <div className="absolute w-4 h-4 bg-indigo-400 rounded-full -left-6 top-1/2 -translate-y-1/2 border-2 border-indigo-200 group-hover:scale-125 transition-transform"></div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-tl-xl rounded-br-xl p-4 md:p-5 shadow-lg hover:scale-[1.03] transition-transform duration-300 clip-slanted">
                      <p className="text-indigo-400 font-semibold text-sm md:text-base mb-1">
                        {group.category}
                      </p>
                      <p className="text-white text-xs md:text-sm">{skill}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="relative z-10 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-700 via-purple-600 to-indigo-500 transform -skew-y-2 opacity-20"></div>
        <div className="relative container-custom text-center py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white drop-shadow-lg">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            I’m available for freelance work and open to new opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-bold shadow-lg hover:shadow-fuchsia-400/40 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            Let's Talk <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;