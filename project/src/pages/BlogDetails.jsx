import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import blogs from "../data/blogs";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function BlogDetail() {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!blog) {
    return <p className="text-center mt-32 text-lg">Blog not found</p>;
  }

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      }`}
    >
      {/* Header */}
      <header className="max-w-3xl mx-auto pt-28 px-6">
        <Link
          to="/blogs"
          className={`inline-flex items-center gap-2 text-sm mb-8 transition ${
            isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <ArrowLeft size={16} />
          Back to blogs
        </Link>

        <h1
          className={`text-4xl sm:text-5xl font-semibold leading-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {blog.title}
        </h1>

        <p className="text-sm text-gray-500 mb-12">
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </header>

      {/* Content */}
      <article
        className={`max-w-3xl mx-auto px-6 pb-32 text-base sm:text-lg leading-loose ${
          isDarkMode ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl font-semibold mt-16 mb-6" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-semibold mt-14 mb-5" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl font-semibold mt-12 mb-4" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="mb-6" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc pl-6 my-6 space-y-3" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal pl-6 my-6 space-y-3" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="leading-relaxed" {...props} />
            ),
            a: ({ ...props }) => (
              <a
                {...props}
                className={`underline underline-offset-4 ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-500"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline ? (
                <div className="my-10">
                  <SyntaxHighlighter
                    style={isDarkMode ? oneDark : vs}
                    language={match ? match[1] : "text"}
                    className="rounded-xl text-sm"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={`px-1.5 py-0.5 rounded text-sm ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
