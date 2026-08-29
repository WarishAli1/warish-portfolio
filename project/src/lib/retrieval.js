import portfolio from "../content/portfolio.json" with { type: "json" };

export function getProfile() {
  return portfolio.profile;
}

export function getEducation() {
  return portfolio.education;
}

export function getExperience() {
  return portfolio.experience;
}

export function getSkills() {
  return portfolio.skills;
}

export function getResearch() {
  return portfolio.research;
}

export function getProjects({ category, query } = {}) {
  let results = portfolio.projects;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter((p) => {
      const haystack = [
        p.title,
        p.summary,
        p.status,
        ...(p.technologies || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return results.map(({ id, title, status, category, summary, technologies, links }) => ({
    id,
    title,
    status,
    category,
    summary,
    technologies,
    links,
  }));
}

export function getProject(id) {
  const project = portfolio.projects.find((p) => p.id === id);
  if (!project) return null;
  return project;
}

export function getBlogPosts({ query } = {}) {
  let posts = portfolio.blog;
  if (query) {
    const q = query.toLowerCase();
    posts = posts.filter((b) =>
      [b.title, b.summary, b.mainCategory, b.subCategory]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  return posts;
}

export const tools = [
  {
    type: "function",
    function: {
      name: "get_profile",
      description:
        "Get Warish's profile: name, role, summary, location, contact, socials, resume link.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_education",
      description: "Get Warish's education history.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_experience",
      description: "Get Warish's work/internship experience.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_skills",
      description:
        "Get Warish's technical skills, grouped by core vs. familiar and by category (ai_ml, backend, frontend, data_infra).",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_research",
      description: "Get Warish's academic research focus and context.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_projects",
      description:
        "List Warish's projects, optionally filtered by category (ai_ml, backend, frontend) or a free-text query matched against title/summary/technologies. Returns summaries only, not full detail.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Filter by category, e.g. 'ai_ml' or 'backend'.",
          },
          query: {
            type: "string",
            description: "Free-text filter, e.g. 'RAG' or 'resume'.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_project",
      description:
        "Get full detail (description, features, challenges, links) for one project by id. Call get_projects first if you don't know the id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "Project id, e.g. 'sykra-research'." },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_blog_posts",
      description:
        "List Warish's blog posts, optionally filtered by a free-text query against title/summary/category.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Free-text filter, e.g. 'transformer'." },
        },
      },
    },
  },
];

const handlers = {
  get_profile: () => getProfile(),
  get_education: () => getEducation(),
  get_experience: () => getExperience(),
  get_skills: () => getSkills(),
  get_research: () => getResearch(),
  get_projects: (args) => getProjects(args || {}),
  get_project: (args) => getProject(args?.id),
  get_blog_posts: (args) => getBlogPosts(args || {}),
};

export function callTool(name, args) {
  const handler = handlers[name];
  if (!handler) {
    return { error: `Unknown tool: ${name}` };
  }
  return handler(args);
}