import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ProjectDrawer = ({ project, onClose }) => {
  const { isDarkMode } = useTheme();
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <AnimatePresence>
        {project && (
          <>
            <motion.div
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className={`fixed top-0 right-0 h-full w-full md:w-[520px] z-50 overflow-y-auto grid-bg ${
                isDarkMode
                  ? "dark-grid bg-[#0c0c14] text-gray-200"
                  : "light-grid bg-white text-gray-900"
              }`}
            >
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  <button onClick={onClose}>
                    <FiX size={22} />
                  </button>
                </div>

                {project.images?.length > 0 && (
                  <div className="space-y-3">
                    <div
                      className="w-full aspect-video overflow-hidden rounded-lg border border-black/10 dark:border-white/10 cursor-pointer"
                      onClick={() => setLightboxImage(project.images[0])}
                    >
                      <img
                        src={project.images[0]}
                        alt="main preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {project.images.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {project.images.slice(1).map((img, i) => (
                          <div
                            key={i}
                            className="min-w-[120px] h-20 rounded-md overflow-hidden border border-black/10 dark:border-white/10 cursor-pointer"
                            onClick={() => setLightboxImage(img)}
                          >
                            <img
                              src={img}
                              alt={`thumb-${i}`}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm leading-relaxed opacity-90">
                  {project.longDescription || project.description}
                </p>

                {project.features && (
                  <div>
                    <h3 className="font-semibold mb-2">Features</h3>
                    <ul className="list-disc ml-5 space-y-1 text-sm opacity-80">
                      {project.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-md border border-black/10 dark:border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {project.challenges && (
                  <div>
                    <h3 className="font-semibold mb-2">Challenges</h3>
                    <div
                      className={`rounded-lg border-l-2 pl-4 pr-4 py-4 text-sm leading-relaxed ${
                        isDarkMode
                          ? "border-amber-400/40 bg-amber-400/[0.06] text-gray-300"
                          : "border-amber-600/30 bg-amber-600/[0.05] text-gray-700"
                      }`}
                    >
                      {project.challenges}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium underline"
                    >
                      <FiGithub /> GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium underline"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

<AnimatePresence>
  {lightboxImage && (
    <>
      <motion.div
        onClick={() => setLightboxImage(null)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-[100]"
      />

      <div className="fixed inset-0 z-[101] flex items-center justify-center p-6">
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-6 right-6 text-white text-3xl hover:text-fuchsia-400 z-[102]"
        >
          <FiX />
        </button>

        {project.images.length > 1 && (
          <button
            onClick={() => {
              const currentIndex = project.images.indexOf(lightboxImage);
              const prevIndex =
                currentIndex === 0
                  ? project.images.length - 1
                  : currentIndex - 1;
              setLightboxImage(project.images[prevIndex]);
            }}
            className="absolute left-6 text-white text-4xl hover:text-fuchsia-400 z-[102]"
          >
            <FiChevronLeft />
          </button>
        )}

        {project.images.length > 1 && (
          <button
            onClick={() => {
              const currentIndex = project.images.indexOf(lightboxImage);
              const nextIndex =
                currentIndex === project.images.length - 1
                  ? 0
                  : currentIndex + 1;
              setLightboxImage(project.images[nextIndex]);
            }}
            className="absolute right-6 text-white text-4xl hover:text-fuchsia-400 z-[102]"
          >
            <FiChevronRight />
          </button>
        )}

        <motion.img
          key={lightboxImage}
          src={lightboxImage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="max-h-[75vh] max-w-[80vw] rounded-lg shadow-lg object-contain cursor-pointer"
        />
      </div>
    </>
  )}
</AnimatePresence>

    </>
  );
};

export default ProjectDrawer;