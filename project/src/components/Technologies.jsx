import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiVuedotjs,
  SiFastapi, SiPytorch, SiScikitlearn, SiNumpy, SiTailwindcss, SiMysql,
  SiPostgresql, SiGit, SiGithub, SiPostman, SiSpringboot, SiHuggingface,
  SiDocker,
} from "react-icons/si";
import { FaJava, FaHtml5, FaCss3Alt, FaAws } from "react-icons/fa";
import { FiShare2, FiFileText, FiLayers, FiBox, FiZap } from "react-icons/fi";
import { TbEye, TbBolt } from "react-icons/tb";

export const SOURCES = {
  project: { label: "Used in projects", mark: null },
  course: { label: "Coursework & certifications", mark: "◇" },
  // work: { label: "Work experience", mark: "●" },
};

const P = "project";
const C = "course";

export const layers = [
  {
    id: "interface",
    label: "Interface",
    hue: "#ef6b5b",
    blurb: "Everything the user sees and touches.",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB", source: P },
      { name: "Next.js", icon: SiNextdotjs, color: "#888888", source: P },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", source: P },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", source: P },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", source: P },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", source: P },
      { name: "HTML", icon: FaHtml5, color: "#E34F26", source: P },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6", source: P },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    hue: "#3b82f6",
    blurb: "Models, retrieval and reasoning.",
    items: [
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", source: P },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E", source: P },
      { name: "Computer Vision", icon: TbEye, color: "#EC4899", source: P },
      { name: "LLMs", icon: TbBolt, color: "#F97316", source: P },
      { name: "RAG", icon: FiFileText, color: "#22C55E", source: P },
      { name: "Embeddings", icon: FiLayers, color: "#14B8A6", source: P },
      { name: "LangGraph", icon: FiShare2, color: "#8B5CF6", source: P },
    ],
  },
  {
    id: "data",
    label: "Data",
    hue: "#22c55e",
    blurb: "Languages, libraries and databases behind the logic.",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB", source: P },
      { name: "NumPy", icon: SiNumpy, color: "#4DABCF", source: P },
      { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E", source: P },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", source: P },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", source: P },
      { name: "Java", icon: FaJava, color: "#f89820", source: P },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", source: P },
    ],
  },
  {
    id: "mlops",
    label: "MLOps & Cloud",
    hue: "#eab308",
    blurb: "Packaging, shipping and running it all.",
    items: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688", source: P },
      { name: "Docker", icon: SiDocker, color: "#2496ED", source: P },
      { name: "Git", icon: SiGit, color: "#F05032", source: P },
      { name: "GitHub", icon: SiGithub, color: "#888888", source: P },
      { name: "Postman", icon: SiPostman, color: "#FF6C37", source: P },
      { name: "AWS", icon: FaAws, color: "#FF9900", source: C },
    ],
  },
];

export const allTech = layers.flatMap((l) => l.items);