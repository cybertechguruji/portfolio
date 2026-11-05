import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Database,
  FileDown,
  Mail,
  Sparkles,
} from "lucide-react";
import { getAllContent } from "@/lib/markdown";
import { ContentCard } from "@/components/card";
import { AnalyticsConsole } from "@/components/analytics-console";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { testimonials } from "@/data/about";

export const metadata = {
  title: "CyberTech Guruji | Data Analyst Portfolio",
  description:
    "Data Analyst specializing in SQL, Python, Power BI, predictive modeling, and executive business intelligence.",
};

const TECH_STACK = [
  "Python",
  "SQL",
  "Power BI",
  "Pandas & NumPy",
  "DAX & M Query",
  "Excel (Advanced)",
  "Statistical Analysis",
];

const VALUE_PILLARS = [
  {
    icon: Database,
    title: "Data Pipelines & ETL",
    description:
      "Writing optimized SQL queries and Python scripts to ingest, clean, and validate messy datasets—eliminating manual spreadsheet busywork.",
  },
  {
    icon: BrainCircuit,
    title: "Predictive Analytics & ML",
    description:
      "Building statistical models and machine learning pipelines in Python to accurately forecast risk, classify churn, and uncover hidden trends.",
  },
  {
    icon: BarChart3,
    title: "Executive BI & Dashboards",
    description:
      "Designing high-impact, interactive Power BI dashboards with tailored DAX measures that empower leadership to make confident, fast decisions.",
  },
];

export default function Home() {
  const allProjects = getAllContent("projects");
  const allBlogs = getAllContent("blogs");

  // Show top 4 featured projects and top 4 articles
  const featuredProjects = allProjects.slice(0, 4);
  const recentBlogs = allBlogs.slice(0, 4);

  return (
    <main className="w-full overflow-x-hidden">
      {/* ── 1. Hero Section ─────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-m3-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-m3-surface-container-high border border-m3-outline-variant/30 text-xs font-medium text-m3-on-surface mb-6 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Full-Time Roles & Freelance Projects</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-m3-on-surface tracking-tight leading-[1.15]">
                Data Analyst —{" "}
                <span className="text-m3-primary">
                  From Raw SQL &amp; Python
                </span>{" "}
                to Executive BI Dashboards.
              </h1>

              {/* Subtitle / Pitch */}
              <p className="mt-5 text-base sm:text-lg text-m3-on-surface-variant max-w-2xl leading-relaxed">
                I help teams turn chaotic datasets into automated data pipelines,
                predictive risk models, and clear interactive dashboards that
                drive measurable business decisions.
              </p>

              {/* Call-to-Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-m3-primary text-m3-on-primary shadow-m3-1 hover:shadow-m3-2 hover:opacity-95 active:scale-95 transition-all"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="/resume.pdf"
                  download="Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-container active:scale-95 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Resume</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-m3-on-surface-variant hover:text-m3-primary hover:bg-m3-surface-container transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Column (Analytics Console) */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <AnalyticsConsole />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Tech Stack Ticker Strip ──────────────────────────────────── */}
      <section className="py-6 border-y border-m3-outline-variant/25 bg-m3-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface-variant shrink-0">
              Core Toolkit &amp; Skills
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-m3-surface-container text-m3-on-surface border border-m3-outline-variant/20 shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Featured Projects Showcase ──────────────────────────────── */}
      <section className="py-16 md:py-20 bg-m3-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-m3-primary bg-m3-primary-container/40 px-3 py-1 rounded-full">
                Selected Work
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-m3-on-surface">
                Featured Case Studies
              </h2>
              <p className="mt-2 text-sm sm:text-base text-m3-on-surface-variant max-w-xl">
                Real-world analyses featuring interactive Power BI dashboards,
                clean SQL transformations, and Python ML notebooks.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-m3-primary hover:underline underline-offset-4 shrink-0"
            >
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
            {featuredProjects.map((project) => (
              <ContentCard
                key={project.slug}
                title={project.title}
                href={`/projects/${project.slug}`}
                imageSrc={project.thumbnail}
                imageAlt={project.title}
                category={project.category}
                date={project.date}
                description={project.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Core Pillars / What I Deliver ───────────────────────────── */}
      <section className="py-16 md:py-20 bg-m3-surface-container-low border-y border-m3-outline-variant/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-m3-primary bg-m3-primary-container/40 px-3 py-1 rounded-full">
              Core Capabilities
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-m3-on-surface">
              How I Deliver Value
            </h2>
            <p className="mt-2 text-sm sm:text-base text-m3-on-surface-variant">
              Bridging the gap between raw database tables and actionable
              executive decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-m3-surface rounded-3xl p-7 border border-m3-outline-variant/30 shadow-m3-1 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-m3-primary-container flex items-center justify-center text-m3-on-primary-container shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-m3-on-surface">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-m3-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Testimonials Carousel ───────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-m3-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-m3-primary bg-m3-primary-container/40 px-3 py-1 rounded-full">
              Recommendations
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-m3-on-surface">
              What People Say
            </h2>
            <p className="mt-2 text-sm sm:text-base text-m3-on-surface-variant">
              Feedback from teams, clients, and collaborators I&rsquo;ve helped
              with data.
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── 6. Latest Articles & Tutorials ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-m3-surface-container-low border-t border-m3-outline-variant/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-m3-primary bg-m3-primary-container/40 px-3 py-1 rounded-full">
                Knowledge &amp; Tutorials
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-m3-on-surface">
                Latest Articles &amp; Insights
              </h2>
              <p className="mt-2 text-sm sm:text-base text-m3-on-surface-variant max-w-xl">
                Practical guides on data analysis careers, SQL, Python, and best
                practices.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-m3-primary hover:underline underline-offset-4 shrink-0"
            >
              <span>Read all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
            {recentBlogs.map((blog) => (
              <ContentCard
                key={blog.slug}
                title={blog.title}
                href={`/blogs/${blog.slug}`}
                imageSrc={blog.thumbnail}
                imageAlt={blog.title}
                category={blog.category}
                date={blog.date}
                description={blog.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Closing Call-To-Action Banner ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-m3-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-m3-surface-container to-m3-surface-container-high border border-m3-outline-variant/40 p-8 sm:p-12 md:p-16 text-center shadow-m3-2 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-m3-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-m3-secondary/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-m3-primary-container text-m3-on-primary-container text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let&rsquo;s Build Together</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-m3-on-surface">
                Ready to turn your data into a competitive advantage?
              </h2>

              <p className="mt-4 text-sm sm:text-base text-m3-on-surface-variant leading-relaxed">
                Whether you have an upcoming analytics project, need an automated
                Power BI dashboard, or want to discuss full-time opportunities,
                I&rsquo;d love to connect.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-m3-primary text-m3-on-primary shadow-m3-1 hover:shadow-m3-2 hover:opacity-95 active:scale-95 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                </Link>

                <a
                  href="/resume.pdf"
                  download="Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-container-lowest active:scale-95 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
