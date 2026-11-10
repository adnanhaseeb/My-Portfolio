export type NavLink = {
  label: string;
  href: `#${string}`;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string | null;
  cvPath: string;
  cvLabel: string;
  siteUrl: string;
  description: string;
  availability: string;
  nav: NavLink[];
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type HeroContent = {
  headlineStart: string;
  headlineHighlight: string;
  headlineEnd: string;
  subtext: string;
  primaryCta: string;
  secondaryCta: string;
  stats: Stat[];
};

export type TraceCheckStatus = "pass" | "flag";

export type TraceCheck = {
  label: string;
  detail: string;
  status: TraceCheckStatus;
};

export type ValidationTrace = {
  documentLabel: string;
  supplier: string;
  extractedFields: { key: string; value: string }[];
  checks: TraceCheck[];
  outcome: string;
};

export type ServiceIcon =
  | "file-scan"
  | "git-compare"
  | "plug"
  | "server"
  | "cloud"
  | "shield-check";

export type Service = {
  icon: ServiceIcon;
  title: string;
  description: string;
};

export type ExperienceProject = {
  name: string;
  context: string;
  stack: string[];
  highlights: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  projects: ExperienceProject[];
  highlights: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  detail: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectCallout = {
  value: string;
  label: string;
};

export type ProjectScreenshot = ProjectImage & {
  kind: "image";
  url?: string;
  callouts?: ProjectCallout[];
  inset?: ProjectImage & { caption: string };
};

export type ProjectVisual =
  | { kind: "illustration"; id: "brkz-flow" | "clinfocus-pipeline" }
  | ProjectScreenshot;

export type Project = {
  slug: string;
  featured?: boolean;
  title: string;
  context: string;
  problem: string;
  built: string[];
  outcome: string;
  stack: string[];
  visual: ProjectVisual;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type ContactContent = {
  heading: string;
  subtext: string;
  successMessage: string;
  errorMessage: string;
  missingConfigMessage: string;
};
