import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import NeonLinesBackground from "../context/NeonLinesBackground";
import projects from "../data/projects";
import { useTheme } from "../context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [tappedSlide, setTappedSlide] = useState(null);
  const handleSlideClick = (id) => {
    setTappedSlide((prev) => (prev === id ? null : id));
  };
  return (
    <div className={`${isDarkMode ? "bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white" : "hero-light text-black"} min-h-screen relative overflow-hidden`}>
    <NeonLinesBackground /> 
      <div className="absolute inset-0 overflow-hidden">
        <div className={`${isDarkMode ? "bg-purple-600/30" : "bg-blue-300/20"} absolute top-20 left-24 w-72 h-72 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`${isDarkMode ? "bg-blue-600/30" : "bg-blue-300/20"} absolute bottom-24 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse`}></div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl font-extrabold ${isDarkMode ? "drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]" : "text-black"} inline-block pb-2`}>
            My Projects
          </h2>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mt-4 max-w-2xl mx-auto text-lg`}>
            Projects that combine creativity and technology to solve real-world problems.
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, EffectCoverflow, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={false}
          navigation={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: isDarkMode ? "swiper-pagination-bullet-active !bg-blue-500" : "swiper-pagination-bullet-active !bg-blue-600",
          }}
          spaceBetween={60}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          coverflowEffect={{ rotate: 50, stretch: 0, depth: 300, modifier: 2.5, slideShadows: true }}
          breakpoints={{ 320: { slidesPerView: 1, spaceBetween: 20 }, 640: { slidesPerView: 2, spaceBetween: 30 }, 1024: { slidesPerView: 3, spaceBetween: 60 } }}
          className="max-w-6xl mx-auto py-12"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <motion.div
                onClick={() => handleSlideClick(project.id)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`relative group rounded-3xl overflow-hidden backdrop-blur-xl border ${
                  isDarkMode ? "border-white/10 bg-white/5 shadow-2xl" : "border-gray-200 bg-white/30 shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                } transition-all duration-300 cursor-pointer w-full`}
              >
                <div className="relative w-full h-96 overflow-hidden rounded-3xl">
                  <motion.img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
                  />

                  <div
                    className={`
                      absolute inset-0 flex flex-col justify-end p-6 text-left transition-opacity duration-300 bg-gradient-to-t ${
                        isDarkMode ? "from-black/70 via-black/40 to-transparent" : "from-gray-800/40 via-gray-100/20 to-transparent"
                      } ${tappedSlide === project.id ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"}
                    `}
                  >
                    <h3 className={`${isDarkMode ? "text-white font-bold" : "text-black"} text-1xl mb-2`}>{project.title}</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-black"} text-sm line-clamp-2`}>{project.description}</p>
                    <div className="mt-4 flex justify-between items-center">
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
                      <div className="flex gap-3">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full ${
                              isDarkMode ? "bg-white/20 text-white hover:bg-white/30" : "bg-white/30 text-black hover:bg-white/40 backdrop-blur-md"
                            } transition`}
                          >
                            <FiExternalLink size={18} />
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
                            <FiGithub size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <Link
            to="/all-projects"
            className={`inline-block px-8 py-2 font-semibold rounded-full transition-all duration-300 border ${
              isDarkMode ? "border-white text-white hover:border-blue-500 hover:text-blue-400" : "border-gray-300 text-black hover:border-purple-500 hover:text-purple-600 bg-white/30 backdrop-blur-md"
            }`}
            style={!isDarkMode ? { backdropFilter: "blur(12px)" } : {}}
          >
            View All Projects
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
