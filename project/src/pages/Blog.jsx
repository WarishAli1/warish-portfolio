import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import blogs from "../data/blogs";
import { useState } from "react";

export default function Blog() {
  const { isDarkMode } = useTheme();

  const bgGradient = isDarkMode
    ? "bg-gradient-to-br from-black via-gray-900 to-gray-950 text-gray-100"
    : "hero-light";

  const [selectedMain, setSelectedMain] = useState("All");
  const [selectedSub, setSelectedSub] = useState("All");
  const mainCategories = [...new Set(blogs.map(b => b.mainCategory))];

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedMain === "All") return true;
    if (selectedSub === "All") return blog.mainCategory === selectedMain;
    return blog.mainCategory === selectedMain && blog.subCategory === selectedSub;
  });

  return (
    <div className={`min-h-screen py-24 px-6 sm:px-10 font-inter ${bgGradient}`}>
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedMain === "All" ? (
            <>
              <button
                key="All"
                onClick={() => setSelectedMain("All")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300
                  ${
                    selectedMain === "All"
                      ? isDarkMode
                        ? "bg-purple-600 text-white border-purple-500 shadow-md"
                        : "bg-purple-500 text-white border-purple-400 shadow-md"
                      : isDarkMode
                      ? "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }
                `}
              >
                All
              </button>
              {mainCategories.map((main) => (
                <button
                  key={main}
                  onClick={() => setSelectedMain(main)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300
                    ${
                      selectedMain === main
                        ? isDarkMode
                          ? "bg-purple-600 text-white border-purple-500 shadow-md"
                          : "bg-purple-500 text-white border-purple-400 shadow-md"
                        : isDarkMode
                        ? "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  {main}
                </button>
              ))}
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSelectedMain("All");
                  setSelectedSub("All");
                }}
                className="px-4 py-1.5 rounded-full text-sm font-medium border bg-gray-200 hover:bg-gray-300 transition-all duration-300"
              >
                ← Main Categories
              </button>
              {[
                ...new Set(
                  blogs
                    .filter((b) => b.mainCategory === selectedMain)
                    .map((b) => b.subCategory)
                ),
              ].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSub(sub)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300
                    ${
                      selectedSub === sub
                        ? isDarkMode
                          ? "bg-purple-600 text-white border-purple-500 shadow-md"
                          : "bg-purple-500 text-white border-purple-400 shadow-md"
                        : isDarkMode
                        ? "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  {sub}
                </button>
              ))}
            </>
          )}
        </motion.div>

        <h1
          className={`text-4xl sm:text-6xl font-semibold tracking-tight mb-4 ${
            isDarkMode ? "drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]" : "text-gray-900"
          }`}
        >
          Articles & Insights
        </h1>
        <p className={`text-lg sm:text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Thoughts, discoveries, and lessons — one post at a time.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`relative rounded-xl border p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg ${
              isDarkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/30 border-gray-200"
            }`}
          >
            <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {blog.title}
            </h2>
            <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {blog.subCategory} • {blog.date ? new Date(blog.date).toLocaleDateString() : "N/A"}
            </p>
            <p className={`text-base mb-4 line-clamp-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {blog.description}
            </p>
            <Link
              to={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Read More →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
