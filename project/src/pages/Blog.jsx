import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import blogs from "../data/blogs";

export default function Blog() {
  const { isDarkMode } = useTheme();

  const bgGradient = isDarkMode
    ? "bg-gradient-to-br from-black via-gray-900 to-gray-950 text-gray-100"
    : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900";

  return (
    <div className={`min-h-screen py-24 px-6 sm:px-10 font-inter ${bgGradient}`}>
      {/* Page Heading */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className={`text-4xl sm:text-6xl font-semibold tracking-tight mb-4 ${
            isDarkMode ? "drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]" : "text-gray-900"
          }`}
        >
          Articles & Insights
        </h1>
        <p
          className={`text-lg sm:text-xl ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Thoughts, discoveries, and lessons — one post at a time.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.02, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-3xl border backdrop-blur-lg transition-all duration-500 ${
              isDarkMode
                ? "bg-white/5 border-white/10 hover:bg-white/10 shadow-[0_8px_40px_rgba(168,85,247,0.15)]"
                : "bg-white/80 border-gray-200 hover:bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            }`}
          >
            {/* Decorative Light Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-purple-500 to-blue-400"
                    : "bg-gradient-to-br from-blue-400 to-purple-300"
                }`}
              ></div>
            </div>

            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <h2
                  className={`text-2xl font-bold mb-3 leading-snug ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {blog.title}
                </h2>
                <p
                  className={`text-base mb-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {blog.description}
                </p>
              </div>

              {/* Date */}
              <p
                className={`text-sm mb-3 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {blog.date
                  ? new Date(blog.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
              </p>

              {/* Link Button */}
              <Link
                to={`/blogs/${blog.id}`}
                className={`inline-flex items-center gap-2 mt-auto font-medium rounded-full px-5 py-2.5 text-sm transition-all duration-300 backdrop-blur-md border ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
                    : "bg-white/60 border-gray-200 hover:bg-white/80 text-gray-800"
                }`}
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
