import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import NeonLinesBackground from "../context/NeonLinesBackground";
import { FiExternalLink, FiGithub, FiArrowLeft } from "react-icons/fi";
import projects from "../data/projects";
import { useTheme } from "../context/ThemeContext";

const AllProjects = () => {
  const navigate = useNavigate();
  const [activeTap, setActiveTap] = useState(null);
  const { isDarkMode } = useTheme();

  const handleTap = (id) => {
    if (activeTap === id) setActiveTap(null); 
    else setActiveTap(id);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white"
          : "hero-light"
      }`}
    >
      <NeonLinesBackground />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {isDarkMode ? (
          <>
            <div className="absolute top-20 left-24 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-24 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
          </>
        ) : (
          <>
            <div className="absolute top-20 left-24 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-24 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          </>
        )}
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-8 text-sm font-semibold border rounded-full px-4 py-2 transition-all duration-300 ${
            isDarkMode
              ? "text-white border-white hover:border-purple-500 hover:text-purple-400"
              : "text-gray-900 border-gray-400 hover:border-purple-500 hover:text-purple-600"
          }`}
        >
          <FiArrowLeft size={18} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
         <h2 className={`text-5xl font-extrabold ${isDarkMode ? "drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]" : "text-black"} inline-block pb-2`}>
            All Projects
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-lg ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
            Explore all projects that combine creativity and technology to solve real-world problems.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={() => handleTap(project.id)}
              className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? "bg-white/5 border-white/10 shadow-2xl hover:bg-white/10 hover:shadow-fuchsia-400/20"
                  : "bg-white/10 border border-gray-300 shadow-md hover:bg-gray-100 hover:shadow-gray-400"
              }`}
            >
              <div className="relative w-full h-60 sm:h-72 overflow-hidden rounded-2xl">
                <motion.img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4 text-left transition-opacity duration-300 ${
                    activeTap === project.id ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"
                  }`}
                >
                  <h3 className={`${isDarkMode ? "text-white font-bold" : "text-white"} text-1xl mb-2`}>{project.title}</h3>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-white"} text-sm line-clamp-2`}>{project.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <Link
                      to={`/projects/${project.id}`}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                          isDarkMode
                            ? "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
                            : "bg-white/30 text-black backdrop-blur-xl border border-white/20 hover:bg-white/40"
                        } transition-all text-sm`}
                      style={!isDarkMode ? { backdropFilter: "blur(12px)" } : {}}  
                    >
                      View Details
                    </Link>
                    <div className="flex gap-2">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full ${
                              isDarkMode ? "bg-white/20 text-white hover:bg-white/30" : "bg-white/30 text-black hover:bg-white/40 backdrop-blur-md"
                            } transition`}
                        >
                          <FiExternalLink size={16} />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full ${
                              isDarkMode ? "bg-white/20 text-white hover:bg-white/30" : "bg-white/30 text-black hover:bg-white/40 backdrop-blur-md"
                            } transition`}
                        >
                          <FiGithub size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
