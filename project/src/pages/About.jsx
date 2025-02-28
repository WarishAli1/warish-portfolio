import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle";
import skills from "../data/skills";

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="page-transition">
      <section className="pt-32 pb-20 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <SectionTitle
            title="About Me"
            subtitle="Learn more about my background, skills, and what drives me as a developer."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold mb-4">My Journey</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Hello! I'm a passionate full-stack developer with a strong
                  focus on creating intuitive and performant web applications.
                  My journey in web development began over 1 year ago when I
                  built my first website using HTML and CSS.
                </p>
                <p>
                  Since then, I've expanded my skills to include modern
                  JavaScript frameworks like React and Vue.js, backend
                  technologies such as Node.js and Python, and database systems
                  including MongoDB and PostgreSQL.
                </p>
                <p>
                  I believe in writing clean, maintainable code and staying
                  up-to-date with the latest industry trends and best practices.
                  My approach to development is centered around solving real
                  problems and creating exceptional user experiences.
                </p>
                <p>
                  When I'm not coding, you can find me hiking in the mountains,
                  reading tech blogs, or experimenting with new technologies on
                  side projects.
                </p>
              </div>

              <div className="mt-8">
                <a href="#" className="inline-flex items-center btn-primary">
                  <FiDownload className="mr-2" /> Download Resume
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <img
                src="ashimsilwal.jpg"
                alt="Profile"
                className="w-full h-auto rounded-lg mb-6"
              />

              <h3 className="text-xl font-bold mb-2">Quick Info</h3>

              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Name:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    Ashim Silwal
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Location:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    Lalitpur, Nepal
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Email:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    ashimslw@gmail.com
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Experience:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    1 Year
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Education & Experience
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      BSc hons. Computer Science with AI
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400">
                      Sunway College, Kathmandu
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    2024 - Present
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Learning Coursework included web development, algorithms, data
                  structures, and software engineering principles.
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">My Skills</h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 text-sm bg-gray-50 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
