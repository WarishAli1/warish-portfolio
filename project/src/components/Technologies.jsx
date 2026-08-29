import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiFastapi,
  SiPytorch,
  SiScikitlearn,
  SiNumpy,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiSpringboot,
} from "react-icons/si";
import { FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { FiShare2, FiFileText } from "react-icons/fi";
import { TbEye } from "react-icons/tb";

export const techStack = [
  { name: "Python", icon: SiPython, color: "#3776AB", tier: "core" },
  { name: "React", icon: SiReact, color: "#61DAFB", tier: "core" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", tier: "core" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", tier: "core" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", tier: "core" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", tier: "core" },
  { name: "LangGraph", icon: FiShare2, color: "#8B5CF6", tier: "core" },
  { name: "RAG", icon: FiFileText, color: "#22C55E", tier: "core" },
  { name: "Computer Vision", icon: TbEye, color: "#EC4899", tier: "core" },
  { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E", tier: "core" },

  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", tier: "familiar" },
  { name: "Java", icon: FaJava, color: "#f89820", tier: "familiar" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", tier: "familiar" },
  { name: "NumPy", icon: SiNumpy, color: "#013243", tier: "familiar" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", tier: "familiar" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26", tier: "familiar" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6", tier: "familiar" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", tier: "familiar" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", tier: "familiar" },
  { name: "Git", icon: SiGit, color: "#F05032", tier: "familiar" },
  { name: "GitHub", icon: SiGithub, color: "#000000", tier: "familiar" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37", tier: "familiar" },
];

export const coreStack = techStack.filter((t) => t.tier === "core");
export const familiarStack = techStack.filter((t) => t.tier === "familiar");