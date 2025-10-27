import { useTheme } from "../context/ThemeContext";

export default function NeonLinesBackground() {
  const { isDarkMode } = useTheme();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className={`absolute top-0 left-0 w-[200%] h-[2px] rotate-45 animate-pulse ${
          isDarkMode ? "bg-purple-500/30" : "bg-gray-400/30"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 w-[200%] h-[2px] -rotate-45 animate-pulse ${
          isDarkMode ? "bg-blue-500/30" : "bg-gray-400/30"
        }`}
      />
    </div>
  );
}
