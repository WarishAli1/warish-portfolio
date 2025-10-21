import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-gray-950 via-gray-900 to-black py-12 overflow-hidden text-white">
      {/* Floating glow blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative container-custom flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-gray-300 text-center md:text-left">
          &copy; {currentYear} <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-[0_0_10px_rgba(0,0,255,0.5)]">Warish Ali</span>. All rights reserved.
        </p>

        <div className="flex space-x-6">
          {[{
            href: "https://github.com/warishali1",
            icon: <FiGithub size={24} />,
            color: "from-gray-500 to-gray-400"
          }, {
            href: "https://linkedin.com/in/warish-ali-885923363",
            icon: <FiLinkedin size={24} />,
            color: "from-blue-500 to-blue-400"
          }, {
            href: "https://x.com/myself_warish",
            icon: <FiTwitter size={24} />,
            color: "from-sky-500 to-cyan-400"
          }].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.href}
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300`}
            >
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
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
