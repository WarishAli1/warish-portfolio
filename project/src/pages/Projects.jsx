import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import projects from "../data/projects";
import ProjectDrawer from "./ProjectDrawer";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid bg-ink text-gray-200" : "light-grid bg-paper text-ink"
      }`}
    >
     <div className="absolute left-0 bottom-0 w-full pointer-events-none px-6 pb-4">
  <span
    className={`font-black select-none ${
      isDarkMode ? "text-gray-200" : "text-ink"
    }`}
    style={{
      fontSize: "120px", // bigger size
      lineHeight: "1",
      whiteSpace: "nowrap",
      opacity: 0.08, // more transparent
    }}
  >
    PROJECTS.
  </span>
</div>





      <section className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className={`text-6xl font-black mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            Projects.
          </h1>
          <p
            className={`max-w-2xl text-base ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Selected engineering and machine learning projects focused on
            problem-solving, system design, and practical implementation.
          </p>
        </motion.div>

        {/* Project List */}
        <div className="space-y-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setActiveProject(project)}
              className="group relative cursor-pointer"
            >
              {/* Card */}
              <div
                className={`relative rounded-lg border transition-all duration-300 overflow-hidden ${
                  isDarkMode
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-black/10 bg-black/[0.02]"
                }`}
                style={{
                  paddingTop: hoveredId === project.id ? "28px" : "20px",
                  paddingBottom: hoveredId === project.id ? "28px" : "20px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                }}
              >
                {/* Content Wrapper */}
                <div className="flex items-start justify-between gap-6">
                  {/* Left Side - Title & Description */}
                  <div className="flex-1 min-w-0">
                    {/* Index Number */}
                    <span
                      className={`text-xs font-mono mb-2 block ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h2
                      className={`text-lg font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {project.title}
                    </h2>

                    {/* Description - Expand on hover */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: hoveredId === project.id ? "auto" : "0",
                        opacity: hoveredId === project.id ? 1 : 0,
                        marginTop: hoveredId === project.id ? "12px" : "0",
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p
                        className={`text-xs leading-relaxed ${
                          isDarkMode ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        {project.shortDescription || project.description}
                      </p>
                    </motion.div>

                    {/* Tech Stack - Expand on hover */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: hoveredId === project.id ? "auto" : "0",
                        opacity: hoveredId === project.id ? 1 : 0,
                        marginTop: hoveredId === project.id ? "10px" : "0",
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies?.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-0.5 rounded border ${
                              isDarkMode
                                ? "border-white/20 text-gray-300 bg-white/5"
                                : "border-black/20 text-gray-700 bg-black/5"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Side - Thumbnail */}
                  {project.images?.[0] && (
                    <motion.img
                      src={project.images[0]}
                      alt="preview"
                      className={`h-16 w-24 object-cover rounded border transition-all ${
                        isDarkMode
                          ? "border-white/10"
                          : "border-black/10"
                      }`}
                      animate={{
                        opacity:
                          hoveredId === project.id ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>

              {/* Subtle bottom line on hover */}
              <motion.div
                className={`absolute bottom-0 left-0 h-0.5 ${
                  isDarkMode ? "bg-white" : "bg-black"
                }`}
                animate={{
                  width: hoveredId === project.id ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Side Drawer */}
      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
};

export default Projects;