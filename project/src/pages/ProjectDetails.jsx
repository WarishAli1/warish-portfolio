import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiCheckCircle,
  FiAlertTriangle,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import projects from "../data/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/projects" className="text-primary-400 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0a1f] via-[#101035] to-[#1a1a4a] text-white min-h-screen">
      {/* Floating Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-72 h-72 bg-fuchsia-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-indigo-600/20 blur-[150px] rounded-full animate-pulse delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-custom max-w-5xl mx-auto"
        >
          {/* Back button */}
          <div className="mb-6 flex justify-center">
            <Link
              to="/projects"
              className="group flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition" /> Back
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 drop-shadow-lg">
            {project.title}
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {project.longDescription}
          </p>

          <div className="mt-10 flex justify-center gap-6">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 font-semibold shadow-lg hover:shadow-fuchsia-400/40 hover:scale-105 transition-all"
              >
                <FiExternalLink className="inline mr-2" /> Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 font-semibold hover:bg-white/20 hover:scale-105 transition-all"
              >
                <FiGithub className="inline mr-2" /> View Code
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container-custom max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-fuchsia-400">✨ Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    <FiCheckCircle className="mt-1 text-green-400" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-amber-400">⚡ Challenges</h2>
              <div className="flex items-start gap-3">
                <FiAlertTriangle className="mt-1 text-yellow-400" />
                <p className="text-gray-200">{project.challenges}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-10">
            {/* Gallery */}
            <div className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <img
                src={project.images[0]}
                alt="main"
                className="w-full h-64 object-cover cursor-pointer hover:scale-[1.02] transition"
                onClick={() => openLightbox(0)}
              />
              <div className="flex overflow-x-auto gap-3 p-4 scrollbar-hide">
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb ${i}`}
                    onClick={() => openLightbox(i)}
                    className="h-20 w-28 object-cover rounded-xl border border-white/10 hover:scale-105 transition cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="rounded-3xl p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-indigo-400">🧠 Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md hover:scale-105 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-[#0a0a1f]">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-white/90">
            🌟 Explore More Projects
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide justify-center">
            {projects
              .filter((p) => p.id !== project.id)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="flex-shrink-0 w-72 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 shadow-md hover:scale-105 hover:shadow-fuchsia-400/20 transition"
                >
                  <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-fuchsia-300">{p.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {p.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-md">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl hover:text-fuchsia-400 transition"
          >
            <FiX />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 text-white text-4xl hover:text-fuchsia-400 transition"
          >
            <FiChevronLeft />
          </button>

          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={project.images[activeIndex]}
            alt="expanded"
            className="max-h-[80%] max-w-[90%] object-contain rounded-2xl shadow-[0_0_30px_rgba(255,0,255,0.3)]"
          />

          <button
            onClick={nextImage}
            className="absolute right-6 text-white text-4xl hover:text-fuchsia-400 transition"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
