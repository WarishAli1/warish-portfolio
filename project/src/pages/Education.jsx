import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiAward, FiPlus } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import projects from "../data/projects";
import ProjectDrawer from "./ProjectDrawer";

const degrees = [
  {
    id: "be",
    title: "Bachelor in Computer Engineering",
    school: "Advanced College of Engineering and Management",
    start: "2023",
    end: "2027",
    ongoing: true,
    projects: [
      { label: "Minor", projectId: "AI-Powered Exam Guide System" },
      { label: "Major", projectId: null }, // set id once it exists in projects.js
    ],
  },
];

const certificates = [
  {
    name: "AWS SimuLearn — Machine Learning",
    issuer: "Amazon Web Services",
    date: "Nov 12, 2026",
    image: "/aws-machine-learning.png",
    link: "https://www.credly.com/badges/7aa67a46-2a50-4ade-8883-e1276d2832c1/public_url",
  },
  {
    name: "AWS Partner: Containers Essentials",
    issuer: "Amazon Web Services",
    date: "Nov 13, 2026",
    image: "/aws-containers-essentials.png",
    link: "https://www.credly.com/badges/0e2f361a-cf41-4f6c-b60a-bb8a8cc12052/public_url",
  },
  {
    name: "AWS SimuLearn: Generative AI Architect",
    issuer: "Amazon Web Services",
    date: "Nov 16, 2026",
    image: "/aws-ai-architect.png",
    link: "https://www.credly.com/badges/e658c330-73b9-44b3-831d-faef4d7f6226/public_url",
  },
];

const findProject = (id) => projects.find((p) => p.id.trim() === id);

const DegreeEntry = ({ degree, index, onOpenProject }) => {
  const { isDarkMode } = useTheme();
  const [hovered, setHovered] = useState(false);
  const ACCENT = isDarkMode ? "#e8a33d" : "#a16207";
  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";
  const faint = isDarkMode ? "text-gray-500" : "text-gray-400";
  const solid = isDarkMode ? "text-white" : "text-gray-900";
  const border = isDarkMode ? "border-white/10" : "border-black/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pb-16 md:grid md:grid-cols-2 md:gap-14"
    >
      <span className="absolute left-3 md:left-1/2 top-2 z-10 block h-2.5 w-2.5 -translate-x-1/2">
        <span
          className="absolute inset-0 block rotate-45"
          style={{
            backgroundColor: degree.ongoing
              ? ACCENT
              : isDarkMode
              ? "#6b7280"
              : "#9ca3af",
          }}
        />
      </span>

      <div className="pl-10 md:pl-0 md:pr-2 md:text-right md:pt-0.5">
        <span className={`font-display text-xl ${solid}`}>
          {degree.start} —{" "}
          <span
            className={`transition-colors duration-300 ${
              degree.ongoing && !hovered ? "index-num" : ""
            }`}
            style={hovered ? { color: ACCENT } : undefined}
          >
            {degree.end}
          </span>
        </span>
        {degree.ongoing && (
          <span
            className={`block text-[9px] uppercase tracking-[0.2em] mt-0.5 ${faint}`}
          >
            Expected
          </span>
        )}
      </div>

      <div className="pl-10 md:pl-2 mt-3 md:mt-0">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`rounded-lg border p-5 transition-colors duration-300 ${border} ${
            isDarkMode
              ? "bg-white/[0.03] hover:border-white/20"
              : "bg-white/70 hover:border-black/20"
          }`}
        >
          <h3
            className={`font-display text-2xl sm:text-[1.75rem] leading-snug transition-colors duration-300 ${solid}`}
          >
            {degree.title}
          </h3>
          <p className={`text-[15px] mt-1 ${muted}`}>{degree.school}</p>

          {degree.projects?.length > 0 && (
            <div className={`mt-4 border-t pt-3.5 ${border}`}>
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.22em] ${faint}`}
              >
                Key work
              </span>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
                {degree.projects.map((dp) => {
                  const p = dp.projectId ? findProject(dp.projectId) : null;
                  return (
                    <span
                      key={dp.label}
                      className="inline-flex items-baseline gap-2"
                    >
                      <span
                        className={`text-[9px] font-medium uppercase tracking-[0.18em] ${faint}`}
                      >
                        {dp.label}
                      </span>
                      {p ? (
                        <button
                          type="button"
                          onClick={() => onOpenProject(p)}
                          className={`inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline cursor-pointer ${
                            isDarkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {p.title.trim()}
                          <FiArrowUpRight size={13} className="text-accent" />
                        </button>
                      ) : (
                        <span className={`font-display italic text-sm ${faint}`}>
                          Coming soon
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CertificateCard = ({ cert, index }) => {
  const { isDarkMode } = useTheme();
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = cert.image && !imgFailed;
  const label = cert.link?.includes("credly.com") ? "Verify" : "View";
  const faint = isDarkMode ? "text-gray-500" : "text-gray-400";

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`project-row group block rounded-lg border overflow-hidden ${
        isDarkMode ? "border-white/10" : "border-black/10"
      }`}
    >
      <div
        className={`grid-bg-sm flex h-40 items-center justify-center border-b ${
          isDarkMode ? "border-white/10 bg-[#12151c]" : "border-black/10 bg-white"
        }`}
      >
        {showImage ? (
          <img
            src={cert.image}
            alt={cert.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-24 w-auto max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <FiAward
            className={`h-8 w-8 ${isDarkMode ? "text-gray-600" : "text-gray-300"}`}
            strokeWidth={1}
          />
        )}
      </div>
      <div className="p-4 sm:p-5">
        <h3
          className={`font-display text-lg leading-snug title-underline inline-block ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {cert.name}
        </h3>
        <p className={`mt-1.5 text-[10px] uppercase tracking-[0.14em] ${faint}`}>
          {cert.issuer}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className={`text-[10px] uppercase tracking-[0.14em] ${faint}`}>
            {cert.date}
          </span>
          {cert.link && (
            <span className="text-accent inline-flex shrink-0 items-center gap-1 text-xs font-medium">
              {label}
              <FiArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
};

const Education = () => {
  const { isDarkMode } = useTheme();
  const [activeProject, setActiveProject] = useState(null);

  const border = isDarkMode ? "border-white/10" : "border-black/10";
  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";
  const faint = isDarkMode ? "text-gray-500" : "text-gray-400";
  const solid = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <main
      className={`min-h-screen grid-bg ${isDarkMode ? "dark-grid" : "light-grid"}`}
    >
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1
            className={`font-display italic text-6xl sm:text-7xl leading-[0.95] tracking-tight mb-5 ${solid}`}
          >
            Education<span className="not-italic text-accent">.</span>
          </h1>
          <p className={`max-w-xl text-sm sm:text-base ${muted}`}>
            Academic background and certificates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`font-display italic text-3xl sm:text-4xl leading-tight mb-14 ${solid}`}
          >
            Degrees<span className="not-italic text-accent">.</span>
          </h2>

          <div className="relative">
            <div
              className={`absolute left-3 md:left-1/2 top-2 bottom-2 w-px ${
                isDarkMode ? "bg-white/10" : "bg-black/10"
              }`}
            />

            {degrees.map((d, i) => (
              <DegreeEntry
                key={d.id}
                degree={d}
                index={i}
                onOpenProject={setActiveProject}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: degrees.length * 0.08 }}
              className="relative md:grid md:grid-cols-2 md:gap-14"
            >
              <span className="absolute left-3 md:left-1/2 top-2 z-10 block h-2 w-2 -translate-x-1/2">
                <span
                  className={`absolute inset-0 block rounded-full border ${
                    isDarkMode ? "border-white/30" : "border-black/30"
                  }`}
                />
              </span>
              <div className="pl-10 md:pl-0 md:pr-2 md:text-right md:pt-0.5">
                <span className={`font-display text-xl ${faint}`}>Next</span>
              </div>
              <div className="pl-10 md:pl-2 mt-3 md:mt-0">
                <div
                  className={`rounded-lg border border-dashed p-5 opacity-60 ${
                    isDarkMode ? "border-white/15" : "border-black/15"
                  }`}
                >
                  <span className={`font-display italic text-xl ${faint}`}>
                    Coming soon
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          id="certificates"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className={`mt-28 scroll-mt-28 border-t ${border} pt-14`}
        >
          <h2
            className={`font-display italic text-3xl sm:text-4xl leading-tight mb-10 ${solid}`}
          >
            Certificates<span className="not-italic text-accent">.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((c, i) => (
              <CertificateCard key={c.name} cert={c} index={i} />
            ))}
            <div
              className={`flex flex-col rounded-lg border border-dashed overflow-hidden opacity-70 ${
                isDarkMode ? "border-white/15" : "border-black/15"
              }`}
            >
              <div
                className={`grid-bg-sm flex h-40 items-center justify-center border-b border-dashed ${
                  isDarkMode ? "border-white/10" : "border-black/10"
                }`}
              >
                <FiPlus
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-gray-600" : "text-gray-300"
                  }`}
                  strokeWidth={1}
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3
                  className={`font-display italic text-lg leading-snug ${faint}`}
                >
                  More to come
                </h3>
                <p
                  className={`mt-1.5 text-[10px] uppercase tracking-[0.14em] ${faint}`}
                >
                  Next credential
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className={`text-[10px] uppercase tracking-[0.14em] ${faint}`}
                  >
                    —
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="relative inset-0 pointer-events-none flex items-end">
        <div className="w-full px-6 pb-4">
          <span
            className={`font-black select-none block whitespace-nowrap leading-none text-[60px] md:text-[120px] opacity-[0.08] -translate-x-[3%] ${
              isDarkMode ? "text-gray-200" : "text-ink"
            }`}
          >
            EDUCATION.
          </span>
        </div>
      </div>

      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
};

export default Education;