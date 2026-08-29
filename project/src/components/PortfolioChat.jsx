import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const SUGGESTIONS = [
  "What projects has Warish built with RAG?",
  "What's Sykra Research?",
  "What's his tech stack?",
];
const ChatOpenContext = createContext(null);

function renderInline(text) {
  const nodes = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++} className="font-semibold">{match[1]}</strong>);
    } else {
      nodes.push(
        <a
          key={key++}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:opacity-80"
        >
          {match[2]}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export function PortfolioChatToggle({ className }) {
  const ctx = useContext(ChatOpenContext);
  if (!ctx) return null;
  const { open, setOpen } = ctx;
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className={className || "theme-toggle"}
      aria-label={open ? "Close chat" : "Ask about Warish"}
    >
      {open ? <FiX /> : <FiMessageSquare />}
    </button>
  );
}

export default function PortfolioChat({ hideLauncher = false }) {
  const { isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatOpenContext.Provider value={{ open, setOpen }}>
      {!hideLauncher && (
        <motion.button
          onClick={() => setOpen((v) => !v)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-colors ${
            isDarkMode
              ? "border-white/15 bg-[#12161d] text-white hover:border-white/30"
              : "border-black/10 bg-white text-black hover:border-black/25"
          }`}
          aria-label="Open chat"
        >
          {open ? <FiX size={18} /> : <FiMessageSquare size={18} />}
        </motion.button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-6 z-40 flex h-[480px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-lg border shadow-2xl ${
              isDarkMode
                ? "border-white/10 bg-[#0a0d12]"
                : "border-black/10 bg-[#fbfbfa]"
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 z-0 grid-bg-sm chat-grid-fade ${
                isDarkMode ? "dark-grid" : "light-grid"
              }`}
            />
            <div
              className={`relative z-10 flex items-center gap-2 border-b px-4 py-2.5 ${
                isDarkMode ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span
                className={`ml-2 font-mono text-[11px] tracking-tight ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                warish@portfolio — chat
              </span>
            </div>

            <div ref={scrollRef} className="relative z-10 flex-1 space-y-4 overflow-y-auto px-4 py-4 font-mono text-[13px]">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                    Ask me about Warish's projects, skills, or background.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className={`rounded-md border px-2.5 py-1.5 text-left text-[11px] transition-colors ${
                          isDarkMode
                            ? "border-white/10 text-gray-300 hover:border-white/25 hover:bg-white/[0.04]"
                            : "border-black/10 text-gray-700 hover:border-black/25 hover:bg-black/[0.03]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <span
                    className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-md border px-3 py-2 text-left leading-relaxed ${
                      m.role === "user"
                        ? isDarkMode
                          ? "border-white/10 bg-white/10 text-gray-100"
                          : "border-black/10 bg-black/[0.06] text-gray-900"
                        : isDarkMode
                        ? "border-white/[0.06] bg-white/[0.03] text-gray-300"
                        : "border-black/[0.05] bg-black/[0.02] text-gray-700"
                    }`}
                  >
                    {m.role === "assistant" && (
                      <span className={isDarkMode ? "text-emerald-400/70" : "text-emerald-600/70"}>{"> "}</span>
                    )}
                    {renderInline(m.content)}
                  </span>
                </div>
              ))}

              {loading && (
                <div className={isDarkMode ? "text-gray-500" : "text-gray-400"}>
                  <span className={isDarkMode ? "text-emerald-400/70" : "text-emerald-600/70"}>{"> "}</span>
                  thinking…
                </div>
              )}

              {error && <div className="text-xs text-red-500">{error}</div>}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className={`relative z-10 flex items-center gap-2 border-t px-3 py-3 ${
                isDarkMode ? "border-white/10" : "border-black/10"
              }`}
            >
              <span className={isDarkMode ? "text-emerald-400/70" : "text-emerald-600/70"}>$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something…"
                className={`flex-1 bg-transparent font-mono text-[13px] outline-none ${
                  isDarkMode ? "text-gray-200 placeholder:text-gray-600" : "text-gray-800 placeholder:text-gray-400"
                }`}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                  isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                } disabled:opacity-30`}
                aria-label="Send"
              >
                <FiSend size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </ChatOpenContext.Provider>
  );
}