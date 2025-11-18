import { useTheme } from "../context/ThemeContext";

export default function GridDotsBackground() {
  const { isDarkMode } = useTheme();

  const dotColor = isDarkMode ? "bg-white/30" : "bg-black/30";
  const lineColor = isDarkMode
    ? "rgba(255, 0, 0, 1)"
    : "rgba(0, 0, 0, 1)";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke={lineColor}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className={`fixed w-2 h-2 rounded-full ${dotColor} animate-[float_6s_infinite_linear]`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            willChange: "transform",
            transform: "translateZ(0)"
          }}
        />
      ))}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}
