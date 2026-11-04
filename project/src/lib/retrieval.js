import portfolio from "../content/portfolio.json" with { type: "json" };

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function calculateAge(birthDate) {
  const dob = new Date(birthDate);
  if (Number.isNaN(dob.getTime())) return undefined;

  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age -= 1;
  }

  return age;
}

function projectText(project) {
  return [
    project.id,
    project.title,
    project.summary,
    project.description,
    project.status,
    project.category,
    ...(project.technologies || []),
    ...(project.features || []),
  ].join(" ");
}

function blogText(post) {
  return [
    post.id,
    post.title,
    post.summary,
    post.mainCategory,
    post.subCategory,
    post.content,
    post.description,
    ...(post.tags || []),
  ].join(" ");
}

function findItem(collection, args, textFn) {
  const term = normalize(args.id || args.title || args.query);
  if (!term) return null;

  const exact = collection.find(
    (item) => normalize(item.id) === term || normalize(item.title) === term
  );

  if (exact) return exact;

  return (
    collection.find((item) => normalize(textFn(item)).includes(term)) || null
  );
}

export function getProfile() {
  const profile = { ...portfolio.profile };

  if (profile.birthDate) {
    profile.age = calculateAge(profile.birthDate);
  }

  return profile;
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
    const q = normalize(query);
    results = results.filter((p) => normalize(projectText(p)).includes(q));
  }

  return results.map(
    ({ id, title, status, category, summary, technologies, links }) => ({
      id,
      title,
      status,
      category,
      summary,
      technologies,
      links,
    })
  );
}

export function getProject(argsOrId) {
  const args =
    typeof argsOrId === "string" ? { id: argsOrId } : argsOrId || {};

  return findItem(portfolio.projects, args, projectText);
}

export function getBlogPosts({ query } = {}) {
  let posts = portfolio.blog;

  if (query) {
    const q = normalize(query);
    posts = posts.filter((b) => normalize(blogText(b)).includes(q));
  }

  return posts;
}

export function getBlogPost(argsOrId) {
  const args =
    typeof argsOrId === "string" ? { id: argsOrId } : argsOrId || {};

  return findItem(portfolio.blog, args, blogText);
}

export function getDetails({ type, id, title, query } = {}) {
  const term = normalize(id || title || query);
  if (!term) return null;

  const wanted = normalize(type).replace(/[^a-z]/g, "");

  const wantsProject =
    !wanted || wanted === "project" || wanted === "projects";

  const wantsBlog =
    !wanted ||
    wanted === "blog" ||
    wanted === "blogs" ||
    wanted === "post" ||
    wanted === "posts" ||
    wanted === "blogpost";

  const project = wantsProject ? getProject({ id, title, query }) : null;
  const post = wantsBlog ? getBlogPost({ id, title, query }) : null;

  if (project && post) {
    const projectExact =
      normalize(project.id) === term || normalize(project.title) === term;

    const postExact =
      normalize(post.id) === term || normalize(post.title) === term;

    if (postExact && !projectExact) {
      return { resultType: "blog", ...post };
    }

    if (projectExact && !postExact) {
      return { resultType: "project", ...project };
    }

    // Default priority: project, because follow-ups often refer to projects.
    return { resultType: "project", ...project };
  }

  if (project) {
    return { resultType: "project", ...project };
  }

  if (post) {
    return { resultType: "blog", ...post };
  }

  return null;
}

export function resolveMentionedEntity(text) {
  const haystack = normalize(text);
  if (!haystack) return null;

  const candidates = [
    ...(portfolio.projects || []).map((p) => ({
      type: "project",
      title: p.title,
      id: p.id,
    })),
    ...(portfolio.blog || []).map((b) => ({
      type: "blog",
      title: b.title,
      id: b.id,
    })),
  ].sort((a, b) => normalize(b.title).length - normalize(a.title).length);

  const match = candidates.find((candidate) =>
    haystack.includes(normalize(candidate.title))
  );

  if (!match) return null;

  return getDetails({ type: match.type, title: match.title });
}

export const tools = [
  {
    type: "function",
    function: {
      name: "get_profile",
      description:
        "Get Warish's profile: name, role, summary, location, contact, socials, resume link, birth date, and computed age if available.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_education",
      description: "Get Warish's education history.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_experience",
      description: "Get Warish's work/internship experience.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_skills",
      description:
        "Get Warish's technical skills, grouped by core vs. familiar and by category (ai_ml, backend, frontend, data_infra).",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_research",
      description: "Get Warish's academic research focus and context.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_projects",
      description:
        "List Warish's projects, optionally filtered by category or query. Returns summaries only. For full project detail, call get_project or get_details.",
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
        "Get full available detail for one project by id, title, or query. Use this when the user asks for more detail about a project, even if you only know the project title from the conversation.",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Project id if known.",
          },
          title: {
            type: "string",
            description: "Project title, e.g. 'Sykra Research'.",
          },
          query: {
            type: "string",
            description: "Free-text project name if id/title is not known.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_blog_posts",
      description:
        "List Warish's blog posts, optionally filtered by query. Returns list/summary fields. For full blog post detail, call get_blog_post or get_details.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Free-text filter, e.g. 'transformer'.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_blog_post",
      description:
        "Get full available detail for one blog post by id, title, or query. Use this when the user asks for more detail about a blog post.",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Blog post id if known.",
          },
          title: {
            type: "string",
            description: "Blog post title if known.",
          },
          query: {
            type: "string",
            description: "Free-text blog post title/topic.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_details",
      description:
        "General detail resolver. Use when the user says 'explain more about it', 'tell me more', or asks for details and the project/blog title can be inferred from the conversation. Pass the title/query; optionally pass type='project' or type='blog'.",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: "Optional: 'project' or 'blog'.",
          },
          id: {
            type: "string",
            description: "Optional id if known.",
          },
          title: {
            type: "string",
            description: "Optional title if known.",
          },
          query: {
            type: "string",
            description:
              "Best free-text title/name, e.g. 'Sykra Research'.",
          },
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
  get_project: (args) => getProject(args || {}),
  get_blog_posts: (args) => getBlogPosts(args || {}),
  get_blog_post: (args) => getBlogPost(args || {}),
  get_details: (args) => getDetails(args || {}),
};

export function callTool(name, args) {
  const handler = handlers[name];

  if (!handler) {
    return { error: `Unknown tool: ${name}` };
  }

  return handler(args);
}