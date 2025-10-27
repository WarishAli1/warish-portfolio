import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const GlowFollower = () => {
  const glowRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const glow = glowRef.current;
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className={`pointer-events-none fixed w-64 h-64 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out z-50 ${
        isDarkMode
          ? "bg-blue-500/20"
          : ""
      }`}
    />
  );
};

export default GlowFollower;
