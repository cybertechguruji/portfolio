import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  BarChart2,
  LayoutDashboard,
  BookOpen,
  FileDown,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  BadgeCheck,
} from "lucide-react";

import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CertificateList } from "@/components/certificate-list";

import {
  bio,
  stats,
  skillGroups,
  experience,
  education,
  certifications,
  testimonials,
} from "@/data/about";

export const metadata: Metadata = {
  title: "About | Mohammad Akram Chaudhary",
  description:
    "Data Analyst specialising in SQL, Python, Power BI, business intelligence, dashboard development, data visualisation, and analytics storytelling.",
};

// Services are defined here so the JSX icons stay in one place
const SERVICES = [
  {
    icon: <BarChart2 className="w-7 h-7" />,
    title: "Data Analytics",
    description:
      "Transform complex datasets into meaningful business insights using SQL, Python, Excel, and statistical analysis to support confident decision-making.",
  },
  {
    icon: <LayoutDashboard className="w-7 h-7" />,
    title: "Business Intelligence",
    description:
      "Design interactive Power BI dashboards that monitor KPIs, simplify reporting, and help stakeholders make faster, data-driven decisions.",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Analytics Communication",
    description:
      "Present analytical findings through dashboards, reports, and data storytelling that make technical insights accessible to every audience.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-m3-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Profile photo */}
            <div className="shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <Image
                  src="/images/logo.png"
                  alt="Mohammad Akram Chaudhary"
                  fill
                  className="object-cover rounded-full ring-4 ring-m3-primary/25"
                  priority
                />
              </div>
            </div>

            {/* Text block */}
            <div className="flex flex-col gap-4 text-center md:text-left max-w-2xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-m3-primary mb-1">
                  About Me
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-m3-on-surface tracking-tight">
                  Mohammad Akram Chaudhary
                </h1>

                <p className="text-base md:text-lg text-m3-on-surface-variant font-medium mt-1">
                  Data Analyst | SQL • Python • Power BI
                </p>
              </div>

              <div className="mt-8 space-y-5 text-lg leading-8 text-m3-on-surface-variant">
                {bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Stat chips */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {stats.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-baseline gap-1.5 px-4 py-1.5 rounded-full bg-m3-secondary-container text-m3-on-secondary-container text-sm font-medium"
                  >
                    <span className="font-bold">{s.value}</span>
                    <span>{s.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. What I Do ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-m3-surface-container-low">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Core Expertise"
            title="How I Create Business Value"
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-m3-surface rounded-3xl p-6 shadow-m3-1 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-m3-primary-container flex items-center justify-center text-m3-on-primary-container shrink-0">
                  {s.icon}
                </div>

                <h3 className="font-semibold text-m3-on-surface text-base">
                  {s.title}
                </h3>

                <p className="text-sm text-m3-on-surface-variant leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Skills & Tools ────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-m3-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technical Skills"
            title="Tools & Technologies"
          />

          <div className="mt-8 flex flex-col gap-5">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="flex flex-col sm:flex-row sm:items-start gap-2.5"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-m3-on-surface-variant sm:w-36 shrink-0 sm:pt-1.5">
                  {group.label}
                </span>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-full bg-m3-secondary-container text-m3-on-secondary-container text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Work Experience ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-m3-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Professional Experience"
            title="Career Journey"
            icon={<Briefcase className="w-5 h-5" />}
          />

          <div className="mt-8 flex flex-col gap-5">
            {experience.map((exp, i) => (
              <div
                key={i}
                className="bg-m3-surface rounded-3xl p-6 md:p-8 shadow-m3-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-m3-on-surface text-base md:text-lg leading-tight">
                      {exp.role}
                    </h3>

                    <p className="text-m3-primary font-medium text-sm mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <span className="text-xs font-medium text-m3-on-surface-variant px-3 py-1 rounded-full bg-m3-surface-container w-fit">
                      {exp.period}
                    </span>

                    <span className="text-xs text-m3-on-surface-variant pl-1">
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2">
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-m3-on-surface-variant leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-m3-primary shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Education ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-m3-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Education"
            title="Academic Foundation"
            icon={<GraduationCap className="w-5 h-5" />}
          />

          <div className="mt-8 flex flex-col gap-5">
            {education.map((edu, i) => (
              <div
                key={i}
                className="bg-m3-surface-container rounded-3xl p-6 md:p-8 shadow-m3-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-m3-on-surface text-base md:text-lg leading-tight">
                      {edu.degree}
                    </h3>

                    <p className="text-m3-primary font-medium text-sm mt-0.5">
                      {edu.institution}
                    </p>

                    <p className="text-xs text-m3-on-surface-variant mt-1.5">
                      {edu.location}
                    </p>
                  </div>

                  <span className="text-xs font-medium text-m3-on-surface-variant px-3 py-1 rounded-full bg-m3-surface-container-low w-fit shrink-0">
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Certifications ────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-m3-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Professional Development"
            title="Certifications & Credentials"
            icon={<Award className="w-5 h-5" />}
          />

          <div className="mt-8">
            <CertificateList certifications={certifications} />
          </div>
        </div>
      </section>

      {/* ── 7. Testimonials ──────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-12 md:py-16 bg-m3-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Recommendations"
              title="What People Say"
            />

            <div className="mt-10">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>
      )}

      {/* ── 8. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-m3-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-m3-on-surface">
            Let&apos;s Turn Data Into Better Decisions
          </h2>

          <p className="text-m3-on-surface-variant max-w-2xl leading-relaxed">
            I&apos;m always interested in opportunities where I can solve
            business problems through analytics, automate reporting, build
            intuitive dashboards, and help teams make data-driven decisions. If
            you&apos;re looking for someone who enjoys turning complex data into
            practical insights, let&apos;s connect.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a
              href="/resume.pdf"
              download="Mohammad_Akram_Chaudhary_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-m3-primary text-m3-on-primary hover:opacity-90 active:scale-95 shadow-m3-1 transition-all duration-200"
            >
              <FileDown className="w-4 h-4" />
              Download Resume
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-container active:scale-95 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

// ── Reusable Section Header ──────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string;
  title: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-m3-primary">
        {eyebrow}
      </p>

      <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-m3-on-surface">
        {icon}
        {title}
      </h2>
    </div>
  );
}