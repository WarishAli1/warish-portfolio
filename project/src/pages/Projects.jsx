import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import NeonLinesBackground from "../context/NeonLinesBackground";
import projects from "../data/projects";
const Projects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      <NeonLinesBackground />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-24 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 inline-block pb-2">
            My Projects
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            Projects that combine creativity and technology to solve real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative group rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full h-64 overflow-hidden rounded-3xl">
                <motion.img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300"
                >
                  <h3 className="text-white font-bold text-xl mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/projects/${project.id}`}
                      className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all text-white text-sm"
                    >
                      View Details
                    </Link>

                    <div className="flex gap-3">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
                        >
                          <FiExternalLink size={18} />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
                        >
                          <FiGithub size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
