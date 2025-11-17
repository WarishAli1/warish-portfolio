import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import blogs from "../data/blogs";
import { ArrowLeft } from "lucide-react";
export default function BlogDetail() {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <p className="text-center mt-32 text-lg">Blog not found</p>;

  const themeStyles = isDarkMode
    ? "bg-black text-gray-200"
    : "hero-light";

  return (
    <div className={`min-h-screen py-24 px-6 sm:px-12 font-sans transition-colors duration-700 ${themeStyles}`}>
      <motion.header
        className="max-w-3xl mx-auto mb-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className={`text-5xl sm:text-6xl font-semibold leading-tight tracking-tight ${
            isDarkMode ? "drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]" : "text-gray-900"
          }`}
        >
          {blog.title}
        </h1>
        <p className="mt-4 text-gray-500 text-lg italic">
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </motion.header>

      <motion.article
        className={`max-w-3xl mx-auto text-lg leading-relaxed tracking-wide ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-semibold my-8 text-gray-800 dark:text-gray-100" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold mt-10 mb-4 text-gray-800 dark:text-gray-100" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-200" {...props} />
            ),
            p: ({ node, ...props }) => <p className="my-6 leading-relaxed" {...props} />,
            li: ({ node, ...props }) => <li className="ml-6 list-disc my-2" {...props} />,
            a: ({ node, ...props }) => (
              <a
                {...props}
                className={`underline font-medium ${
                  isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-purple-600 hover:text-purple-500"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline ? (
                <SyntaxHighlighter
                  style={isDarkMode ? oneDark : vs}
                  language={match ? match[1] : "text"}
                  PreTag="div"
                  className="rounded-xl my-6"
                  customStyle={
                    !isDarkMode
                      ? { background: "rgba(255,255,255,0.3)", padding: "1rem", borderRadius: "0.75rem" }
                      : {}
                  }
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {blog.content}
      </ReactMarkdown>

      </motion.article>
      <motion.div
        className="flex justify-center mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/blogs"
          className={`flex items-center gap-2 mb-8 text-sm font-semibold border rounded-full px-4 py-2 transition-all duration-300 ${
            isDarkMode
              ? "text-white border-white hover:border-blue-500 hover:text-blue-400"
              : "text-gray-900 border-black hover:border-purple-500 hover:text-purple-600"
          }`}
        >
          <ArrowLeft size={18} /> Back
        </Link>
      </motion.div>
    </div>
  );
}
