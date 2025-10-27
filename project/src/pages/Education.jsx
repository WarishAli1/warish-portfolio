import { useTheme } from "../context/ThemeContext";
import NeonLinesBackground from "../context/NeonLinesBackground";
const Education = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden flex items-center justify-center ${isDarkMode ? "bg-gradient-to-br from-[#05010a] via-[#0a0020] to-[#0d002d] text-white" : "bg-gray-50 text-black"}`}>
     {isDarkMode && <NeonLinesBackground />}
      {!isDarkMode && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-t from-blue-200 via-purple-200 to-transparent rounded-t-full opacity-40 shadow-lg"></div>
      )}

      <div className="relative z-10 w-full max-w-3xl px-6">
        <h1 className={`text-4xl font-bold mb-10 text-center ${isDarkMode ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" : "text-black"}`}>
          Education
        </h1>

        <div className={`relative border-l ${isDarkMode ? "border-purple-500/40" : "border-gray-400"} ml-5`}>
          <div className="mb-10 ml-6 group">
            <div className={`absolute w-3 h-3 rounded-full -left-1.5 border-2 ${isDarkMode ? "bg-purple-500 border-purple-300" : "bg-gray-500 border-gray-400"} group-hover:scale-125 transition-transform`} />
            <div className={`rounded-xl p-5 shadow-md border transition-transform duration-300 ${isDarkMode ? "bg-white/10 backdrop-blur-md border-white/10 hover:scale-[1.03]" : "bg-white border-gray-300 hover:scale-[1.02] backdrop-blur-sm"}`}>
              <h2 className={`text-xl font-semibold ${isDarkMode ? "text-purple-300" : "text-gray-800"}`}>
                Bachelor of Computer Engineering
              </h2>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mt-1`}>
                Advanced College of Engineering and Management
              </p>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mt-1`}>2023 - Present</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
