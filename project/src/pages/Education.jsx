import { useEffect, useRef } from "react";
import NeonLinesBackground from "../context/NeonLinesBackground";
const Education = () => {
  const glowRef = useRef(null);

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#05010a] via-[#0a0020] to-[#0d002d] text-white overflow-hidden flex items-center justify-center">
      <NeonLinesBackground />
      <div
        className="pointer-events-none absolute w-64 h-64 bg-blue-500/20 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      />

      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/30 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full max-w-3xl px-6">
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Education
        </h1>

        <div className="relative border-l border-purple-500/40 ml-5">
          <div className="mb-10 ml-6 group">
            <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-1.5 border-2 border-purple-300 group-hover:scale-125 transition-transform" />
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/10 hover:scale-[1.03] transition-transform duration-300">
              <h2 className="text-xl font-semibold text-purple-300">
                Bachelor of Computer Engineering
              </h2>
              <p className="text-gray-300 mt-1">
                Advanced College of Engineering and Management
              </p>
              <p className="text-sm text-gray-400 mt-1">2023 - Present</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
