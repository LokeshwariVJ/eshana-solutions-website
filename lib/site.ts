export const siteConfig = {
  name: "Eshana Software Solutions LLC",
  shortName: "Eshana",
  tagline: "Build fast. Ship with confidence.",
  url: "https://www.eshanasolutions.com",
  description:
    "Eshana Software Solutions provides Quality Engineering, test automation, API testing, AI-assisted software quality, and QA consulting for startups and modern software teams.",
  email: "hello@eshanasolutions.com",
};

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/quality-audit", label: "Quality Audit" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const primaryServices = [
  {
    title: "Quality Engineering",
    description: "Find the issues that matter before your customers do.",
  },
  {
    title: "Test Automation",
    description: "Automation built around real customer workflows.",
  },
  {
    title: "AI-Assisted Quality",
    description:
      "Use AI to accelerate engineering without lowering the quality bar.",
  },
];

export const secondaryCapabilities = [
  "API Testing",
  "Data Validation",
  "CI/CD Quality",
  "QA Strategy",
  "Process Automation",
  "Power Platform Solutions",
];

export const auditIncludes = [
  "Critical workflow testing",
  "Authentication review",
  "API and error handling checks",
  "Edge-case exploration",
  "Responsive/browser review",
  "Prioritized defect report",
  "Release-risk assessment",
  "30-minute findings review",
];

export const selectedWork = [
  {
    slug: "triagezero",
    title: "TriageZero",
    summary: "AI-assisted regression failure investigation",
    href: "/work/triagezero",
    tags: ["Playwright", "Gemini", "Google ADK", "Google Cloud"],
    image: "/images/triagezero-command-center.png",
    imageAlt:
      "TriageZero command center showing AI-assisted regression failure investigations and release-risk metrics",
    imageWidth: 2686,
    imageHeight: 1604,
  },
  {
    slug: "aec-quality-workflow",
    title: "AEC Quality Workflow",
    summary: "Digitizing an engineering QA/QC review process",
    href: "/work/aec-quality-workflow",
    tags: ["Next.js", "Supabase", "Playwright", "Vercel"],
    image: "/images/aec-qaqc-dashboard.png",
    imageAlt:
      "AEC QA/QC dashboard showing project checklist status, open issues, flagged items, and project-phase quality metrics",
    imageWidth: 2486,
    imageHeight: 1604,
  },
];

export const insightTitles = [
  '"It Worked" Is Not "It\'s Fixed"',
  "Automate the Investigation - Not the Decision",
  "What QA Looks Like When Software Is Built With AI",
  "What Should Actually Block a Release?",
];
