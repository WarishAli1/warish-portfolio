import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import blogs from "../data/blogs";
import { getReadTime } from "../utils/readTime";

export default function Blog() {
  const { isDarkMode } = useTheme();
  const border = isDarkMode ? "border-white/10" : "border-black/10";

  const sorted = blogs
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main
      className={`min-h-screen grid-bg ${isDarkMode ? "dark-grid" : "light-grid"}`}
    >
      <section className="max-w-4xl mx-auto px-6 pt-36 pb-44">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 sm:mb-20"
        >
          <h1 className="font-display italic text-7xl sm:text-8xl leading-[0.9] tracking-tight">
            Writing<span className="not-italic text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed opacity-70">
            Insights, notes, and blog posts about what I learn, explore, and
            experiment with.
          </p>
        </motion.header>

        <div className={`border-t ${border}`}>
          {sorted.map((blog, i) => {
            const readTime = getReadTime(blog.content);
            const d = new Date(blog.date);
            const dateStr = d.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <Link
                key={blog.id}
                to={`/blogs/${blog.id}`}
                className={`index-row group grid grid-cols-[auto_1fr] sm:grid-cols-[5.5rem_1fr_auto] gap-x-6 sm:gap-x-10 items-start py-10 sm:py-14 border-b ${border}`}
              >
                <span className="index-num font-display text-5xl sm:text-6xl leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="block min-w-0">
                  <h2 className="font-display text-2xl sm:text-[1.75rem] leading-snug title-underline">
                    {blog.title}
                  </h2>
                  <span className="mt-3 block font-mono text-[11px] lowercase tracking-wide opacity-55">
                    {blog.mainCategory}
                    {blog.subCategory && ` / ${blog.subCategory}`} · {readTime}{" "}
                    min read
                    <span className="sm:hidden"> · {dateStr}</span>
                  </span>
                </span>

                <span className="hidden sm:flex flex-col items-end justify-between self-stretch py-1 shrink-0">
                  <span className="font-mono text-xs opacity-60">{dateStr}</span>
                  <svg
                    className="w-10 h-3 text-accent opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
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
                </span>
              </Link>
            );
          })}
        </div>
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
            transform: "translateX(-3%)"
          }}
        >
          WRITING.
        </span>
      </div>
    </div>
    </main>
  );
}