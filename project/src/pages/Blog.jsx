import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import blogs from "../data/blogs";

export default function Blog() {
  const { isDarkMode } = useTheme();

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      }`}
    >
      <section className="max-w-6xl mx-auto px-6 py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Writing
          </h1>
          <p className="max-w-2xl text-lg opacity-80">
            Notes, explanations, and insights from engineering, machine learning,
            and system design experiments.
          </p>
        </motion.div>

        {/* Blog List */}
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`rounded-xl border p-6 transition cursor-pointer ${
                isDarkMode
                  ? "border-white/10 hover:bg-white/5"
                  : "border-black/10 hover:bg-black/5"
              }`}
            >
              <Link to={`/blogs/${blog.id}`} className="flex gap-6 items-start">
                {/* Index */}
                <span className="text-sm font-mono opacity-50 pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm opacity-80 max-w-3xl line-clamp-2">
                    {blog.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs opacity-70">
                    <span>{blog.mainCategory}</span>
                    {blog.subCategory && <span>• {blog.subCategory}</span>}
                    {blog.date && (
                      <span>
                        • {new Date(blog.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
