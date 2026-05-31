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
                src="/warish.JPEG"
                  alt="Warish Ali"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold">Warish Ali</h2>
              <p className="uppercase tracking-wide text-sm text-muted mt-1">
                Engineering Student · Developer
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
