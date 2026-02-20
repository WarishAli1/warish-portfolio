import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative overflow-hidden py-12 transition-all duration-500 border-t ${
        isDarkMode
          ? "bg-gradient-to-t from-gray-950 via-black to-gray-900 text-white border-white/10"
          : "hero-lightCustomCursor border-black/10"
      }`}
    >
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
              darkColor: "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white",
              lightColor: "border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"
            },
            {
              href: "https://linkedin.com/in/warish-ali-885923363",
              icon: <FiLinkedin size={24} />,
              darkColor: "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white",
              lightColor: "border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"
            },
            {
              href: "https://x.com/myself_warish",
              icon: <FiTwitter size={24} />,
              darkColor: "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white",
              lightColor: "border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"
            }
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.href}
              className={`w-12 h-12 rounded-full border flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                isDarkMode ? social.darkColor : social.lightColor
              }`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;