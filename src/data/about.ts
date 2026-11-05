// PART 1 OF about.ts

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

export const bio = [
  "I'm Mohammad Akram Chaudhary, a Data Analyst with a strong foundation in IT operations and a passion for turning data into actionable business insights. I enjoy uncovering patterns, solving complex problems, and building data-driven solutions that support smarter decision-making.",

  "Using SQL, Python, Power BI, and Excel, I analyze data, automate workflows, and build intuitive dashboards that transform complex information into clear, actionable insights. My goal is simple: turn raw data into meaningful business value.",
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  {
    value: "4+",
    label: "Years Experience",
  },
  {
    value: "250K+",
    label: "Records Analysed",
  },
  {
    value: "40%",
    label: "Manual Effort Reduced",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────────────────────────────────────

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Programming",
    skills: [
      "Python",
      "SQL",
      "R (Basic)",
    ],
  },

  {
    label: "Business Intelligence",
    skills: [
      "Power BI",
      "Tableau",
      "Looker Studio",
    ],
  },

  {
    label: "Python Libraries",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
    ],
  },

  {
    label: "Databases",
    skills: [
      "MySQL",
      "PostgreSQL",
      "SQLite",
    ],
  },

  {
    label: "Analytics",
    skills: [
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Hypothesis Testing",
      "Data Visualization",
      "Dashboard Design",
      "Business Intelligence",
      "Data Storytelling",
      "Machine Learning",
    ],
  },

  {
    label: "Tools & Platforms",
    skills: [
      "Microsoft Excel",
      "Power Query",
      "Git",
      "GitHub",
      "Jupyter Notebook",
      "VS Code",
      "Google Sheets",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Experience
// ─────────────────────────────────────────────────────────────────────────────

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    role: "Desktop Support Engineer",

    company:
      "Pon Pure Chemicals India Pvt. Ltd. (via Aforeserve Ltd. & KHS Infotech Pvt. Ltd.)",

    period: "May 2022 – Present",

    location: "Mumbai",

    bullets: [
      "Developed Excel and Power Query dashboards to monitor more than 200 IT assets, reducing manual audit effort by approximately 40%.",

      "Automated weekly MIS reporting workflows, reducing report preparation time from nearly three hours to less than thirty minutes while improving reporting accuracy and consistency.",

      "Designed KPI tracking reports for IT support operations, enabling management to monitor SLA performance, MTTR, and overall service quality.",

      "Analysed operational support data to identify recurring issues, improve reporting quality, and support data-driven decision making.",

      "Created standardized reporting templates and documentation that improved consistency across IT operations and reduced repetitive manual work.",
    ],
  },

  {
    role: "Druva Helpdesk Administrator",

    company:
      "Cosine Solutions Pvt. Ltd. (Client: More Retail Pvt. Ltd.)",

    period: "Nov 2021 – Jan 2022",

    location: "Mumbai",

    bullets: [
      "Prepared compliance, backup, and inactivity reports for enterprise infrastructure using operational data collected from Druva systems.",

      "Analysed backup trends and system usage to support infrastructure planning and improve reporting visibility for IT leadership.",

      "Maintained accurate operational records while ensuring consistency across reporting activities.",
    ],
  },

  {
    role: "Desktop Support Engineer",

    company: "Pronet Private Limited",

    period: "Sep 2019 – Feb 2021",

    location: "Mumbai",

    bullets: [
      "Managed inventory datasets and service records using Microsoft Excel with a strong focus on data accuracy.",

      "Used Pivot Tables and Excel analysis to forecast inventory requirements, helping reduce excess stock by approximately 15%.",

      "Supported operational planning by analysing service trends, inventory movement, and procurement data.",

      "Collaborated with cross-functional teams to maintain accurate documentation and improve operational reporting.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Education
// ─────────────────────────────────────────────────────────────────────────────

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export const education: Education[] = [
  {
    degree: "Bachelor of Science (Computer Science)",
    institution: "University of Mumbai",
    period: "2022 – 2024",
    location: "Mumbai, Maharashtra",
  },
  {
    degree: "Diploma in Engineering (Electronics & Telecommunication)",
    institution: "MSBTE",
    period: "2014 – 2019",
    location: "Thane, Maharashtra",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Certifications
// ─────────────────────────────────────────────────────────────────────────────

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  image: string;
  skills?: string[];
}

export const certifications: Certification[] = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google · Completed via Coursera",
    year: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/professional-cert/certificate/IJP2ZFEJLM0Z",
    image: "/images/Coursera-IJP2ZFEJLM0Z.webp",
    skills: ["SQL", "R Programming", "Tableau", "Spreadsheets", "Data Cleaning", "Data Storytelling"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Core Expertise
// ─────────────────────────────────────────────────────────────────────────────

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "Data Analytics",

    icon: "BarChart3",

    description:
      "Transform raw and complex datasets into meaningful insights using SQL, Python, Excel, and statistical techniques to answer business questions and support better decision-making.",
  },

  {
    title: "Business Intelligence",

    icon: "LayoutDashboard",

    description:
      "Design interactive Power BI dashboards that simplify complex information, track KPIs, and help stakeholders monitor business performance with confidence.",
  },

  {
    title: "Analytics Communication",

    icon: "Presentation",

    description:
      "Present insights through dashboards, reports, and visual storytelling that make technical findings easy for both technical and non-technical audiences to understand.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Professional Highlights
// ─────────────────────────────────────────────────────────────────────────────

export interface Highlight {
  title: string;
}

export const highlights: Highlight[] = [
  {
    title: "4+ Years of Professional Experience",
  },

  {
    title: "Reduced weekly reporting time from 3 hours to under 30 minutes",
  },

  {
    title: "Built dashboards tracking over 200 business assets",
  },

  {
    title: "Analysed 250K+ healthcare and finance records across portfolio projects",
  },

  {
    title: "Strong foundation in SQL, Python, Power BI, Excel, and Business Intelligence",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Call To Action
// ─────────────────────────────────────────────────────────────────────────────

export const cta = {
  title: "Let's Turn Data Into Better Decisions",

  description:
    "I'm always interested in opportunities where I can solve business problems through analytics, automate reporting, build intuitive dashboards, and help teams make data-driven decisions. If you're looking for someone who enjoys turning complex data into practical insights, let's connect.",

  primaryButton: {
    label: "Contact Me",
    href: "/contact",
  },

  secondaryButton: {
    label: "View Projects",
    href: "/projects",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────────────

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

// Keep empty until you have real recommendations.
export const testimonials: Testimonial[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────────────────────────────────────

export const seo = {
  title:
    "About Mohammad Akram Chaudhary | Data Analyst | SQL • Python • Power BI",

  description:
    "Mohammad Akram Chaudhary is a Data Analyst specializing in SQL, Python, Power BI, dashboard development, business intelligence, data visualization, automation, and transforming complex data into actionable business insights.",
};

