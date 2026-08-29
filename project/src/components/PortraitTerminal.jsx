import { useTheme } from "../context/ThemeContext";

const PortraitTerminal = ({ src, className = "", bare = false }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        bare
          ? ""
          : `rounded-lg border ${
              isDarkMode ? "border-white/15 bg-[#0a0d12]" : "border-black/15 bg-[#f4f4f2]"
            }`
      } ${className}`}
    >
      {!bare && (
        <div
          className={`flex items-center gap-1.5 border-b px-3 py-1.5 ${
            isDarkMode ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
          <span
            className={`ml-2 font-mono text-[9px] uppercase tracking-widest ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            whoami
          </span>
        </div>
      )}

      <div className="relative" style={{ height: bare ? "100%" : "calc(100% - 29px)" }}>
        <img
          src={src}
          alt="Warish Ali"
          className="h-full w-full object-cover"
          style={{
            filter: isDarkMode
              ? "grayscale(1) contrast(1.25) brightness(0.95)"
              : "grayscale(1) contrast(1.15)",
          }}
        />

        <div
          className={`pointer-events-none absolute inset-0 ${
            isDarkMode ? "mix-blend-color" : "mix-blend-multiply"
          }`}
          style={{
            backgroundColor: isDarkMode ? "#c9d1d9" : "#e8e6df",
          }}
        />
        <div
          className={`pointer-events-none absolute inset-0 ${
            isDarkMode ? "bg-black/25" : "bg-white/10"
          }`}
        />

        <div
          className={`pointer-events-none absolute inset-x-0 h-12 animate-scan bg-gradient-to-b ${
            isDarkMode
              ? "from-transparent via-white/15 to-transparent"
              : "from-transparent via-black/10 to-transparent"
          }`}
        />

        {!bare && (
          <div
            className={`absolute bottom-0 left-0 right-0 px-3 py-2 font-mono text-[10px] backdrop-blur-[2px] ${
              isDarkMode ? "bg-black/50 text-gray-300" : "bg-white/70 text-gray-700"
            }`}
          >
            <span className="opacity-60">$</span> whoami{" "}
            <span className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}>
              → warish_ali
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes portraitScan {
          0% { transform: translateY(-20%); }
          100% { transform: translateY(600%); }
        }
        .animate-scan {
          animation: portraitScan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PortraitTerminal;