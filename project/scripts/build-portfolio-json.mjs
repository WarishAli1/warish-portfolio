import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECTS_PATH = path.join(ROOT, "../src/data/projects.js");
const BLOGS_PATH = path.join(ROOT, "../src/data/blogs.js");
const FACTS_PATH = path.join(ROOT, "../content/facts.json");
const OUT_PATH = path.join(ROOT, "../content/portfolio.json");

const CATEGORY_RULES = [
  { category: "ai_ml", keywords: ["pytorch", "langgraph", "langchain", "rag", "llm", "nlp", "ocr", "sentence-transformers", "scikit-learn", "openai", "groq", "tensorflow", "opencv", "facenet"] },
  { category: "frontend", keywords: ["react", "next.js", "vue.js", "tailwind", "typescript", "primevue"] },
  { category: "backend", keywords: ["fastapi", "spring boot", "java", "node.js", "mysql"] },
];

function inferCategory(technologies = []) {
  const lower = technologies.map((t) => t.toLowerCase());
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((k) => lower.some((t) => t.includes(k)))) {
      return rule.category;
    }
  }
  return "other";
}

function stripToFirstSentences(text, maxSentences = 2) {
  if (!text) return "";
  const sentences = text.split(/(?<=[.!?])\s+/).slice(0, maxSentences);
  return sentences.join(" ").trim();
}

async function loadEsmArray(filePath) {
  const url = `file://${filePath}?update=${Date.now()}`;
  const mod = await import(url);
  return mod.default;
}

async function main() {
  if (!fs.existsSync(PROJECTS_PATH)) {
    console.error(`Could not find projects.js at ${PROJECTS_PATH}. Edit PROJECTS_PATH in this script.`);
    process.exit(1);
  }
  if (!fs.existsSync(BLOGS_PATH)) {
    console.error(`Could not find blogs.js at ${BLOGS_PATH}. Edit BLOGS_PATH in this script.`);
    process.exit(1);
  }
  if (!fs.existsSync(FACTS_PATH)) {
    console.error(`Could not find facts.json at ${FACTS_PATH}. See content/facts.json in this bundle.`);
    process.exit(1);
  }

  const projectsRaw = await loadEsmArray(PROJECTS_PATH);
  const blogsRaw = await loadEsmArray(BLOGS_PATH);
  const facts = JSON.parse(fs.readFileSync(FACTS_PATH, "utf8"));

  const projects = projectsRaw.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status || "completed",
    category: inferCategory(p.technologies),
    summary: p.description,
    description: p.longDescription || p.description,
    technologies: p.technologies || [],
    features: p.features || [],
    challenges: p.challenges || "",
    links: {
      github: p.githubLink && p.githubLink !== "#" ? p.githubLink : null,
      demo: p.demoLink && p.demoLink !== "#" ? p.demoLink : null,
    },
  }));

  const blog = blogsRaw.map((b) => ({
    id: b.id,
    title: b.title,
    date: b.date,
    mainCategory: b.mainCategory,
    subCategory: b.subCategory,
    summary: b.description || stripToFirstSentences(b.content?.replace(/[#*`]/g, "")),
  }));

  const portfolio = {
    profile: facts.profile,
    education: facts.education,
    experience: facts.experience,
    skills: facts.skills,
    research: facts.research,
    projects,
    blog,
  };

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(portfolio, null, 2));
  console.log(`Wrote ${OUT_PATH} — ${projects.length} projects, ${blog.length} blog posts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});