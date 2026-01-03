import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      }`}
    >
      <section className="container-custom pt-40 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          I’m Warish Ali
        </h1>

        <p className="text-muted mb-8 leading-relaxed">
          An engineering student with a strong curiosity for technology and
          problem-solving. I’m currently focusing deeply on
          <span className="font-medium"> Machine Learning </span>
          while continuously exploring new tools, ideas, and emerging
          technologies.
        </p>

        <p className="text-muted mb-10 leading-relaxed">
          Alongside ML, I work as a
          <span className="font-medium"> Full-Stack Java Developer</span>,
          building scalable backend systems and clean, user-focused web
          interfaces. I enjoy learning by building, experimenting, and sharing
          what I discover along the way.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="btn-lift border-black dark:border-white"
          >
            View Projects
          </Link>

          <Link
            to="/blogs"
            className="btn-lift border-black dark:border-white"
          >
            Read Blogs
          </Link>

          <Link
            to="/contact"
            className="btn-lift border-black dark:border-white"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
