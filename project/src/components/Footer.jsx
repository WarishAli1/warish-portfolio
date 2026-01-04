import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative overflow-hidden py-12 transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-t from-gray-950 via-black to-gray-900 text-white"
          : "hero-lightCustomCursor"
      }`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {isDarkMode ? (
          <>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          </>
        )}
      </div>

      <div className="relative container-custom flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className={`text-center md:text-left ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          &copy; {currentYear}{" "}
          <span
            className={`font-semibold ${
              isDarkMode
                ? "drop-shadow-[0_0_10px_rgba(0,0,255,0.5)]"
                : "text-black"
            }`}
          >
            Warish Ali
          </span>
          . All rights reserved.
        </p>

        <div className="flex space-x-6">
          {[
            {
              href: "https://github.com/warishali1",
              icon: <FiGithub size={24} />,
              darkColor: "from-gray-500 to-gray-400",
              lightColor: "from-gray-400 to-gray-300"
            },
            {
              href: "https://linkedin.com/in/warish-ali-885923363",
              icon: <FiLinkedin size={24} />,
              darkColor: "from-blue-500 to-blue-400",
              lightColor: "from-blue-400 to-blue-300"
            },
            {
              href: "https://x.com/myself_warish",
              icon: <FiTwitter size={24} />,
              darkColor: "from-sky-500 to-cyan-400",
              lightColor: "from-sky-400 to-cyan-300"
            }
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.href}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 bg-gradient-to-br ${
                isDarkMode ? social.darkColor : social.lightColor
              }`}
            >
              <span
                className={`drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {social.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
