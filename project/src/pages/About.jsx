import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import NeonLinesBackground from "../context/NeonLinesBackground";
export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      <NeonLinesBackground />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-32 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Me
        </motion.h1>

        <p className="text-center text-gray-400 text-lg mb-16">
          Get to know who I am beyond just the code.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center"
          >
            <motion.div
              className="relative w-52 h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(99,102,241,0.5)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-600/30 blur-2xl opacity-50"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <img
                src="/warish.HEIC"
                alt="Warish Ali"
                className="object-cover w-full h-full rounded-2xl relative z-10"
              />
            </motion.div>

            <h2 className="mt-6 text-3xl font-bold text-white">Warish Ali</h2>
            <p className="text-sm font-medium text-purple-400 mt-1 uppercase tracking-wide">
              Software Engineer
            </p>
            <p className="mt-2 text-gray-400">
              Kathmandu, Nepal · ✉️ warishkhan384@gmail.com
            </p>

            <motion.a
              href="/resume.pdf"
              download="Warish_Ali_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              <FiDownload className="mr-2" /> Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 text-gray-300 leading-relaxed text-lg"
          >
            <p className="mb-6">
              I’m a developer who enjoys building applications that work well
              and actually solve problems. I’ve worked with{" "}
              <span className="font-semibold text-purple-400">Java, Vue.js, and Spring Boot</span>{" "}
              — not my main focus, but tools I like using to connect ideas from
              front to back.
            </p>
            <p>
              Lately, I’ve been exploring{" "}
              <span className="font-semibold text-blue-400">machine learning with PyTorch</span>,
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
