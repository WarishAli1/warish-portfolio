import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const CursorFollower = () => {
  const outerCircleRef = useRef(null);
  const innerDotRef = useRef(null);
  const { isDarkMode } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const outerCircle = outerCircleRef.current;
      const innerDot = innerDotRef.current;

      if (!outerCircle || !innerDot) return;

      // Outer circle position
      outerCircle.style.left = `${e.clientX}px`;
      outerCircle.style.top = `${e.clientY}px`;

      // Inner dot position
      innerDot.style.left = `${e.clientX}px`;
      innerDot.style.top = `${e.clientY}px`;

      // Check if hovering over interactive element
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive =
        element &&
        (element.tagName === "A" ||
          element.tagName === "BUTTON" ||
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA" ||
          element.tagName === "SELECT" ||
          element.getAttribute("role") === "button" ||
          element.onclick ||
          element.className.includes("cursor-pointer") ||
          element.className.includes("hover:"));

      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Outer Circle - Hidden on hover */}
      <div
        ref={outerCircleRef}
        className={`pointer-events-none fixed rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-out border-2 ${
          isDarkMode
            ? "border-white/40 bg-white/0"
            : "border-black/40 bg-black/0"
        } ${isHovering ? "opacity-0 w-12 h-12" : "opacity-100 w-16 h-16"}`}
      />

      {/* Inner Dot - Larger on hover */}
      <div
        ref={innerDotRef}
        className={`pointer-events-none fixed rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-200 ease-out ${
          isDarkMode
            ? isHovering
              ? "w-4 h-4 bg-white/40"
              : "w-2 h-2 bg-white/60"
            : isHovering
            ? "w-4 h-4 bg-black/40"
            : "w-2 h-2 bg-black/60"
        }`}
      />
    </>
  );
};

export default CursorFollower;