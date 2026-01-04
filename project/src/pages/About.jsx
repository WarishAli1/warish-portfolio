import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid bg-ink text-gray-200" : "light-grid bg-paper text-ink"
      }`}
    >
      
      <section className="container-custom max-w-6xl py-32">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Me
        </motion.h1>

        <p className="text-center text-muted mb-20">
          A little context about my background, interests, and direction.
        </p>

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
              <div className="w-56 h-56 rounded-xl overflow-hidden mb-6 border border-black/10 dark:border-white/10">
                <img
                  src="/warish.HEIC"
                  alt="Warish Ali"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold">Warish Ali</h2>
              <p className="uppercase tracking-wide text-sm text-muted mt-1">
                Engineering Student · Developer
              </p>

              <p className="mt-3 text-sm text-muted">
                Kathmandu, Nepal · ✉️ warishkhan384@gmail.com
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
              I’m an engineering student who enjoys understanding how systems
              work — from low-level logic to high-level abstractions. I’m
              naturally curious and always eager to explore new ideas,
              technologies, and ways of solving problems more efficiently.
            </p>

            <p className="mb-6">
              I have hands-on experience as a{" "}
              <span className="font-medium">Full-Stack Java Developer</span>,
              where I’ve worked with backend systems, APIs, databases, and
              frontend interfaces. This background helps me think about software
              not just as code, but as complete, usable systems.
            </p>

            <p>
              Currently, my main focus is on{" "}
              <span className="font-medium">Machine Learning</span>. I’m actively
              exploring modern ML concepts, architectures, and workflows —
              learning how models reason, how data flows through them, and how
              intelligent systems can be designed responsibly. I see ML as a
              long-term journey of continuous learning, experimentation, and
              refinement.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
