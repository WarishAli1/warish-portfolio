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

function certificateText(cert) {
  return [
    cert.id,
    cert.name,
    cert.issuer,
    cert.type,
    cert.description,
    ...(cert.skills || []),
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


const LEVEL_LABELS = {
  project: "used in a project",
  work: "used at work",
  course: "coursework / certification",
  writing: "written about",
  listed: "listed as a skill, no project evidence",
  unknown: "not recorded",
};

function escapeRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function skillMatch(haystack, needle) {
  const h = normalize(haystack);
  const n = normalize(needle);
  if (!h || !n) return false;
  if (h === n) return true;
  return new RegExp(`(^|[^a-z0-9])${escapeRe(n)}([^a-z0-9]|$)`).test(h);
}

function anyMatch(values, terms) {
  return (values || []).some((v) => terms.some((t) => skillMatch(v, t)));
}

function findSkillRecord(term) {
  const groups = portfolio.skills?.skill_sources || [];
  for (const group of groups) {
    for (const service of group.services || []) {
      const names = [service.name, ...(service.aliases || [])];
      if (names.some((n) => skillMatch(n, term) || skillMatch(term, n))) {
        return { group, service };
      }
    }
    const names = [group.skill, ...(group.aliases || [])];
    if (names.some((n) => skillMatch(n, term) || skillMatch(term, n))) {
      return { group, service: null };
    }
  }
  return null;
}

function collectUsage(terms) {
  const projects = [];
  for (const p of portfolio.projects || []) {
    const inStack = anyMatch(p.technologies, terms);
    const inText = terms.some((t) => skillMatch(projectText(p), t));
    if (inStack || inText) {
      projects.push({
        id: p.id,
        title: p.title,
        status: p.status,
        evidence: inStack ? "listed in the tech stack" : "mentioned in the write-up",
      });
    }
  }

  const experience = (portfolio.experience || [])
    .filter(
      (e) =>
        anyMatch(e.technologies, terms) ||
        terms.some((t) => skillMatch(e.description, t))
    )
    .map((e) => ({ role: e.role, context: e.context }));

  const certificates = (portfolio.certificates || [])
    .filter(
      (c) =>
        anyMatch(c.skills, terms) ||
        terms.some((t) => skillMatch(certificateText(c), t))
    )
    .map((c) => ({
      id: c.id,
      name: c.name,
      issued: c.issued,
      verifyUrl: c.verifyUrl,
    }));

  const posts = (portfolio.blog || [])
    .filter((b) => terms.some((t) => skillMatch(blogText(b), t)))
    .map((b) => ({ id: b.id, title: b.title }));

  return { projects, experience, certificates, posts };
}

function listedInSkills(terms) {
  const skills = portfolio.skills || {};
  const tiers = ["core", "familiar"].filter((tier) =>
    anyMatch(skills[tier], terms)
  );
  const categories = Object.entries(skills.categories || {})
    .filter(([, values]) => anyMatch(values, terms))
    .map(([key]) => key);
  return {
    tiers,
    categories,
    listed: tiers.length > 0 || categories.length > 0,
  };
}

function certificatesByIds(ids) {
  return (ids || [])
    .map((id) =>
      (portfolio.certificates || []).find(
        (c) => normalize(c.id) === normalize(id)
      )
    )
    .filter(Boolean)
    .map((c) => ({
      id: c.id,
      name: c.name,
      issued: c.issued,
      verifyUrl: c.verifyUrl,
    }));
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

export function getDegreeProjects() {
  const list = portfolio.education || [];
  const entry = list.find((e) => e.projects) || list[0];
  if (!entry) return null;
  return {
    degree: entry.degree,
    institution: entry.institution,
    period: entry.period,
    status: entry.status,
    expectedCompletion: entry.expectedCompletion || null,
    projects: entry.projects || null,
  };
}

export function getCertificates({ query } = {}) {
  let certs = portfolio.certificates || [];
  if (query) {
    const q = normalize(query);
    certs = certs.filter((c) => normalize(certificateText(c)).includes(q));
  }
  return certs;
}

export function getExperience() {
  return portfolio.experience;
}

export function getSkills() {
  const { core, familiar, categories } = portfolio.skills || {};
  return { core, familiar, categories };
}

export function getSkillSource(argsOrSkill) {
  const args =
    typeof argsOrSkill === "string" ? { skill: argsOrSkill } : argsOrSkill || {};
  const raw = args.skill || args.query || args.name;
  const term = normalize(raw);
  if (!term) return null;

  const record = findSkillRecord(term);
  const group = record?.group || null;
  const service = record?.service || null;
  const name = service?.name || group?.skill || String(raw).trim();

  const terms = [name, term];
  if (service) terms.push(...(service.aliases || []));
  if (group && !service) terms.push(...(group.aliases || []));
  const uniqueTerms = [...new Set(terms)];

  const usage = collectUsage(uniqueTerms);
  const listing = listedInSkills(uniqueTerms);

  const linked = certificatesByIds(
    service?.certificateIds || group?.certificateIds
  );
  const certificates = [
    ...new Map([...usage.certificates, ...linked].map((c) => [c.id, c])).values(),
  ];

  const level =
    group?.level ||
    (usage.projects.length
      ? "project"
      : usage.experience.length
      ? "work"
      : certificates.length
      ? "course"
      : usage.posts.length
      ? "writing"
      : listing.listed
      ? "listed"
      : "unknown");

  return {
    skill: name,
    parent: service ? group.skill : null,
    found:
      Boolean(record) ||
      usage.projects.length > 0 ||
      usage.experience.length > 0 ||
      certificates.length > 0 ||
      usage.posts.length > 0 ||
      listing.listed,
    level,
    levelLabel: LEVEL_LABELS[level] || LEVEL_LABELS.unknown,
    hasProject: usage.projects.length > 0,
    listedIn: listing.tiers,
    categories: listing.categories,
    origin: group?.origin || null,
    usedFor: service?.usedFor || null,
    depth: service?.depth || null,
    note: group?.note || null,
    next: group?.next || null,
    projects: usage.projects,
    experience: usage.experience,
    certificates,
    posts: usage.posts,
  };
}

export function getResearch() {
  return portfolio.research;
}

export function getProjects({ category, query } = {}) {
  let results = portfolio.projects || [];
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
  const args = typeof argsOrId === "string" ? { id: argsOrId } : argsOrId || {};
  return findItem(portfolio.projects || [], args, projectText);
}

export function getBlogPosts({ query } = {}) {
  let posts = portfolio.blog || [];
  if (query) {
    const q = normalize(query);
    posts = posts.filter((b) => normalize(blogText(b)).includes(q));
  }
  return posts;
}

export function getBlogPost(argsOrId) {
  const args = typeof argsOrId === "string" ? { id: argsOrId } : argsOrId || {};
  return findItem(portfolio.blog || [], args, blogText);
}

export function getDetails({ type, id, title, query } = {}) {
  const term = normalize(id || title || query);
  if (!term) return null;

  const wanted = normalize(type).replace(/[^a-z]/g, "");
  const wantsProject = !wanted || wanted === "project" || wanted === "projects";
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
    return { resultType: "project", ...project };
  }
  if (project) return { resultType: "project", ...project };
  if (post) return { resultType: "blog", ...post };
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
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_education",
      description:
        "Get Warish's education history, including the current degree and its minor/major project entries.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_degree_projects",
      description:
        "Get the minor and major projects of Warish's current Bachelor in Computer Engineering degree. Use for any question about his minor project, major project, final-year project, or degree/academic projects. Minor = Exam Guide System (completed). Major = in progress, not yet published.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_certificates",
      description:
        "Get Warish's certificates and certifications (e.g. AWS badges), including name, issuer, issue date, skills, and Credly verification links. Use for any question about certificates, certifications, badges, or credentials.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Optional free-text filter, e.g. 'AWS' or 'machine learning'.",
          },
        },
      },
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
        "Get Warish's technical skills, grouped by core vs. familiar and by category (ai_ml, backend, frontend, data_infra, cloud). For where a skill came from or whether he built anything with it, use get_skill_source instead.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_skill_source",
      description:
        "Explain where one of Warish's skills came from and whether he has built anything with it. Works for ANY skill, not just AWS. Returns the level (project / work / course / writing / listed), the projects and work experience using it, the certificates that taught it, and any blog posts about it. Use for 'where did he learn X', 'did he use X in a project', 'which project uses X', or 'is his AWS experience hands-on or production'.",
      parameters: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description:
              "Skill or service name, e.g. 'Python', 'Java', 'AWS', 'Bedrock', 'SageMaker', 'LangGraph', 'Docker'.",
          },
        },
        required: ["skill"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_research",
      description:
        "Get Warish's academic research focus and context, including his final-year BCT research.",
      parameters: { type: "object", properties: {} },
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
          id: { type: "string", description: "Project id if known." },
          title: { type: "string", description: "Project title, e.g. 'Sykra Research'." },
          query: { type: "string", description: "Free-text project name if id/title is not known." },
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
          query: { type: "string", description: "Free-text filter, e.g. 'transformer'." },
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
          id: { type: "string", description: "Blog post id if known." },
          title: { type: "string", description: "Blog post title if known." },
          query: { type: "string", description: "Free-text blog post title/topic." },
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
          type: { type: "string", description: "Optional: 'project' or 'blog'." },
          id: { type: "string", description: "Optional id if known." },
          title: { type: "string", description: "Optional title if known." },
          query: { type: "string", description: "Best free-text title/name, e.g. 'Sykra Research'." },
        },
      },
    },
  },
];

const handlers = {
  get_profile: () => getProfile(),
  get_education: () => getEducation(),
  get_degree_projects: () => getDegreeProjects(),
  get_certificates: (args) => getCertificates(args || {}),
  get_experience: () => getExperience(),
  get_skills: () => getSkills(),
  get_skill_source: (args) => getSkillSource(args || {}),
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