import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import projects from '../data/projects';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/projects" className="text-primary-600 dark:text-primary-400 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <Link
            to="/projects"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8"
          >
            <FiArrowLeft className="mr-2" /> Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {project.longDescription}
            </p>

            {/* Project Images */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                {project.images.slice(1).map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 2}`}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="space-y-2 mb-8">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{project.challenges}</p>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-bold mb-4">Project Info</h2>
                  
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        <FiExternalLink className="mr-2" /> Live Demo
                      </a>
                    )}
                    
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        <FiGithub className="mr-2" /> View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Project */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Explore More Projects</h2>
              <Link to="/projects" className="btn-primary">
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;