import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import blogs from "../data/blogs";
import { getReadTime } from "../utils/readTime";

export default function Blog() {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("All");

  const rail = isDarkMode ? "border-white/15" : "border-black/15";
  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";
  const faint = isDarkMode ? "text-gray-500" : "text-gray-500";
  const strong = isDarkMode ? "text-white" : "text-gray-900";

  const categories = useMemo(() => {
    const set = [...new Set(blogs.map((b) => b.mainCategory).filter(Boolean))];
    return ["All", ...set];
  }, []);

  const countOf = (c) =>
    c === "All" ? blogs.length : blogs.filter((b) => b.mainCategory === c).length;

  // filtered + sorted, then grouped by year
  const groups = useMemo(() => {
    const list = blogs
      .filter((b) => filter === "All" || b.mainCategory === filter)
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const map = new Map();
    list.forEach((b) => {
      const y = new Date(b.date).getFullYear();
      if (!map.has(y)) map.set(y, []);
      map.get(y).push(b);
    });
    return [...map.entries()];
  }, [filter]);

  let firstShown = true;

  return (
    <main
      className={`min-h-screen grid-bg ${isDarkMode ? "dark-grid" : "light-grid"}`}
    >
      <section className="max-w-3xl mx-auto px-6 pt-36 pb-44">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1
            className={`font-display italic text-7xl sm:text-8xl leading-[0.9] tracking-tight ${strong}`}
          >
            Writing<span className="not-italic text-accent">.</span>
          </h1>
          <p className={`mt-6 max-w-xl text-sm sm:text-base leading-relaxed ${muted}`}>
            Insights, notes, and blog posts about what I learn, explore, and
            experiment with.
          </p>
        </motion.header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-16">
          {categories.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border transition-all ${
                  active
                    ? isDarkMode
                      ? "bg-white text-gray-900 border-white"
                      : "bg-gray-900 text-white border-gray-900"
                    : `${muted} ${
                        isDarkMode
                          ? "border-white/15 hover:border-white/40 hover:text-white"
                          : "border-black/15 hover:border-black/40 hover:text-gray-900"
                      }`
                }`}
              >
                {c}
                <span className="text-[10px] font-mono opacity-60">
                  {countOf(c)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className={`relative border-l ${rail} ml-1.5`}>
          <AnimatePresence mode="popLayout">
            {groups.map(([year, items]) => (
              <motion.div
                layout
                key={year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                {/* year marker */}
                <div className="relative pl-8 sm:pl-12 pb-8">
                  <span
                    className={`absolute -left-[7px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 ${
                      isDarkMode
                        ? "border-white/60 bg-transparent"
                        : "border-black/60 bg-transparent"
                    }`}
                  />
                  <span
                    className={`font-display italic text-3xl sm:text-4xl ${faint}`}
                  >
                    {year}
                  </span>
                </div>

                {items.map((blog) => {
                  const d = new Date(blog.date);
                  const dayMonth = d
                    .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
                    .toUpperCase();
                  const readTime = getReadTime(blog.content);
                  const isLatest = firstShown;
                  firstShown = false;
                  const excerpt = blog.excerpt || blog.description;

                  return (
                    <Link
                      key={blog.id}
                      to={`/blogs/${blog.id}`}
                      className="group relative block pl-8 sm:pl-12 pb-14"
                    >
                      {/* dot */}
                      <span
                        className={`absolute -left-[5px] top-[0.55rem] h-2.5 w-2.5 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-accent ${
                          isLatest
                            ? "bg-accent shadow-[0_0_0_4px_rgba(180,120,40,0.18)]"
                            : isDarkMode
                            ? "bg-white/40"
                            : "bg-black/35"
                        }`}
                      />

                      {/* date + meta */}
                      <div
                        className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] ${faint}`}
                      >
                        <span className={isLatest ? "text-accent" : ""}>
                          {dayMonth}
                        </span>
                        <span className="opacity-40">/</span>
                        <span>{readTime} min read</span>
                      </div>

                      {/* title */}
                      <h2
                        className={`mt-3 font-display text-2xl sm:text-[1.9rem] leading-[1.2] tracking-normal transition-transform duration-300 group-hover:translate-x-1 ${strong}`}
                      >
                        {blog.title}
                      </h2>

                      {excerpt && (
                        <p
                          className={`mt-3 max-w-xl text-sm leading-relaxed line-clamp-2 ${muted}`}
                        >
                          {excerpt}
                        </p>
                      )}

                      {/* tags + arrow */}
                      <div className="mt-4 flex items-center gap-2">
                        {blog.mainCategory && (
                          <span
                            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] lowercase tracking-wide ${muted} ${
                              isDarkMode ? "border-white/15" : "border-black/15"
                            }`}
                          >
                            {blog.mainCategory}
                          </span>
                        )}
                        {blog.subCategory && (
                          <span
                            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] lowercase tracking-wide ${muted} ${
                              isDarkMode ? "border-white/15" : "border-black/15"
                            }`}
                          >
                            {blog.subCategory}
                          </span>
                        )}
                        <svg
                          className="ml-1 h-3 w-8 text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                          viewBox="0 0 40 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M0 6h36m0 0l-5-5m5 5l-5 5"
                          />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {groups.length === 0 && (
          <p className={`text-sm ${muted}`}>No posts in this category yet.</p>
        )}
      </section>

      <div className="relative inset-0 pointer-events-none flex items-end">
        <div className="w-full px-6 pb-4">
          <span
            className={`font-black select-none ${
              isDarkMode ? "text-gray-200" : "text-ink"
            }`}
            style={{
              fontSize: window.innerWidth < 768 ? "60px" : "120px",
              lineHeight: "1",
              whiteSpace: "nowrap",
              opacity: 0.08,
              display: "block",
              textAlign: "left",
              transform: "translateX(-3%)",
            }}
          >
            WRITING.
          </span>
        </div>
      </div>
    </main>
  );
}