import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import blogs from "../data/blogs";
import { ArrowLeft } from "lucide-react";
import { Children, useEffect, useMemo, useState } from "react";

function getNodeText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return child;
      }

      return child?.props?.children ? getNodeText(child.props.children) : "";
    })
    .join("");
}

function cleanHeadingText(value) {
  return value
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[`*_~#]/g, "")
    .trim();
}

function createHeadingId(value) {
  return (
    cleanHeadingText(value)
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

function getMarkdownHeadings(content) {
  const headingCounts = {};
  let isInsideCodeBlock = false;

  return content
    .split("\n")
    .map((line, index) => {
      const trimmedLine = line.trim();

      if (/^(```|~~~)/.test(trimmedLine)) {
        isInsideCodeBlock = !isInsideCodeBlock;
        return null;
      }

      if (isInsideCodeBlock) {
        return null;
      }

      const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(trimmedLine);

      if (!match) {
        return null;
      }

      const title = cleanHeadingText(match[2]);
      const baseId = createHeadingId(title);
      headingCounts[baseId] = (headingCounts[baseId] || 0) + 1;
      const id =
        headingCounts[baseId] === 1
          ? baseId
          : `${baseId}-${headingCounts[baseId]}`;

      return title
        ? {
            id,
            line: index + 1,
            title,
            level: match[1].length,
          }
        : null;
    })
    .filter(Boolean);
}

export default function BlogDetail() {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const headings = useMemo(
    () => getMarkdownHeadings(blog?.content || ""),
    [blog?.content]
  );
  const [activeHeadingId, setActiveHeadingId] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!headings.length) {
      setActiveHeadingId("");
      return;
    }

    const updateActiveHeading = () => {
      const readingOffset = window.innerHeight * 0.32;
      const visibleHeadings = headings
        .map((heading) => {
          const element = document.getElementById(heading.id);

          return element
            ? {
                id: heading.id,
                top: element.offsetTop,
              }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);

      if (!visibleHeadings.length) {
        setActiveHeadingId("");
        return;
      }

      const checkpoint = window.scrollY + readingOffset;
      let currentHeadingId = visibleHeadings[0].id;

      for (const heading of visibleHeadings) {
        if (heading.top <= checkpoint) {
          currentHeadingId = heading.id;
        } else {
          break;
        }
      }

      setActiveHeadingId(currentHeadingId);
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [headings]);

  const scrollToHeading = (headingId) => {
    const element = document.getElementById(headingId);

    if (!element) {
      return;
    }

    const headerOffset = 112;
    const targetTop =
      element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const getRenderedHeadingId = (node, children) => {
    const sourceLine = node?.position?.start?.line;
    const heading = headings.find((item) => item.line === sourceLine);

    return heading?.id || createHeadingId(getNodeText(children));
  };

  const headingComponents = {
    h1: ({ node, children, ...props }) => (
      <h1
        {...props}
        id={getRenderedHeadingId(node, children)}
        className="scroll-mt-28 text-3xl font-semibold mt-16 mb-6"
      >
        {children}
      </h1>
    ),
    h2: ({ node, children, ...props }) => (
      <h2
        {...props}
        id={getRenderedHeadingId(node, children)}
        className="scroll-mt-28 text-2xl font-semibold mt-14 mb-5"
      >
        {children}
      </h2>
    ),
    h3: ({ node, children, ...props }) => (
      <h3
        {...props}
        id={getRenderedHeadingId(node, children)}
        className="scroll-mt-28 text-xl font-semibold mt-12 mb-4"
      >
        {children}
      </h3>
    ),
  };

  if (!blog) {
    return <p className="text-center mt-32 text-lg">Blog not found</p>;
  }

  const activeHeadingIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeHeadingId)
  );

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      }`}
    >
      <nav
        className="fixed right-4 sm:right-8 lg:right-12 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex"
        aria-label="Article sections"
      >
        {headings.length > 0 && (
          <span
            className={`pointer-events-none absolute right-0 top-0 h-0.5 w-7 rounded-full transition-transform duration-300 ease-in-out ${
              isDarkMode ? "bg-white" : "bg-gray-900"
            }`}
            style={{
              transform: `translateY(${activeHeadingIndex * 24 + 7}px)`,
            }}
          />
        )}

        {headings.map((heading) => {
          const isActive = heading.id === activeHeadingId;

          return (
            <button
              key={heading.id}
              type="button"
              onClick={() => scrollToHeading(heading.id)}
              className="group relative flex h-4 items-center justify-end"
              aria-label={`Go to ${heading.title}`}
            >
              <span
                className={`pointer-events-none absolute right-full mr-3 w-48 break-words rounded-md border px-2.5 py-1.5 text-left text-xs leading-snug opacity-0 shadow-lg transition group-hover:opacity-100 ${
                  isDarkMode
                    ? "border-white/10 bg-gray-950 text-white"
                    : "border-black/10 bg-white text-gray-900"
                }`}
              >
                {heading.title}
              </span>

              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  isActive ? "w-7" : heading.level === 3 ? "w-4" : "w-5"
                } ${
                  isDarkMode
                    ? isActive
                      ? "bg-white/0"
                      : "bg-white/35 group-hover:bg-white/70"
                    : isActive
                    ? "bg-gray-900/0"
                    : "bg-gray-900/30 group-hover:bg-gray-900/60"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Header */}
      <header className="max-w-3xl mx-auto pt-28 px-6">
        <nav
          className={`mb-8 flex flex-wrap items-center gap-2 text-sm font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
          aria-label="Breadcrumb"
        >
          <Link
            to="/blogs"
            className={`rounded-sm border-b transition ${
              isDarkMode
                ? "border-cyan-300/50 text-cyan-300 hover:border-cyan-200 hover:text-cyan-100"
                : "border-blue-500/50 text-blue-700 hover:border-blue-700 hover:text-blue-900"
            }`}
          >
            Writing
          </Link>

          {blog.mainCategory && (
            <>
              <span className="opacity-50">&gt;</span>
              <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
                {blog.mainCategory}
              </span>
            </>
          )}

          {blog.subCategory && (
            <>
              <span className="opacity-50">&gt;</span>
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                {blog.subCategory}
              </span>
            </>
          )}
        </nav>

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
        className={`max-w-3xl mx-auto px-6 pb-14 text-base sm:text-lg leading-loose ${
          isDarkMode ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <ReactMarkdown
          components={{
            ...headingComponents,
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

      <footer className="max-w-3xl mx-auto px-6 pb-32">
        <div className="pt-8">
          <Link
            to="/blogs"
            className={`group inline-flex items-center gap-3 rounded-xl py-2 pr-3 transition-colors duration-300 ${
              isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-950"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 ${
                isDarkMode
                  ? "border-white/15 bg-white/[0.03] group-hover:border-white/35 group-hover:bg-white/[0.06]"
                  : "border-black/10 bg-black/[0.02] group-hover:border-black/25 group-hover:bg-black/[0.04]"
              }`}
              aria-hidden="true"
            >
              <ArrowLeft
                size={17}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </span>

            <span className="flex flex-col gap-0.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
                Finished reading
              </span>
              <span
                className={`relative w-fit text-base font-semibold tracking-normal after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100 ${
                  isDarkMode
                    ? "text-gray-100 after:bg-gray-100"
                    : "text-gray-900 after:bg-gray-900"
                }`}
              >
                Back to writing
              </span>
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
