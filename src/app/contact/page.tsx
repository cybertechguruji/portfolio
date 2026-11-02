import { ContactForm } from "@/components/contact-form";
import { EmailCopyCard } from "@/components/email-copy-card";
import { contactInfo } from "@/data/contact";
import { MapPin, ExternalLink, Sparkles } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export const metadata = {
  title: "Contact | CyberTech Guruji - Data Analyst",
  description: "Get in touch with Akram (CyberTech Guruji) for data analytics roles, projects, and collaborations.",
};

const SOCIAL_ITEMS = [
  {
    name: "LinkedIn",
    description: "Professional network & experience",
    href: contactInfo.socials.linkedin,
    icon: FaLinkedinIn,
    color: "text-[#0077b5]",
    bgHover: "hover:border-[#0077b5]/50",
  },
  {
    name: "GitHub",
    description: "Code, SQL queries & data notebooks",
    href: contactInfo.socials.github,
    icon: FaGithub,
    color: "text-m3-on-surface",
    bgHover: "hover:border-m3-primary/50",
  },
  {
    name: "YouTube",
    description: "Tech tutorials & data walkthroughs",
    href: contactInfo.socials.youtube,
    icon: FaYoutube,
    color: "text-[#ff0000]",
    bgHover: "hover:border-[#ff0000]/50",
  },
  {
    name: "Twitter / X",
    description: "Data thoughts & tech updates",
    href: contactInfo.socials.twitter,
    icon: FaXTwitter,
    color: "text-m3-on-surface",
    bgHover: "hover:border-m3-primary/50",
  },
  {
    name: "Instagram",
    description: "Behind the scenes & visual content",
    href: contactInfo.socials.instagram,
    icon: FaInstagram,
    color: "text-[#e4405f]",
    bgHover: "hover:border-[#e4405f]/50",
  },
];

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-12 text-center sm:text-left">
        <span className="text-xs font-semibold tracking-wider uppercase text-m3-primary bg-m3-primary-container/40 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-m3-on-surface">
          Let&apos;s Connect &amp; Collaborate
        </h1>
        <p className="mt-2 text-base text-m3-on-surface-variant max-w-2xl">
          Whether you have a job opportunity, a data analytics project, or just want to discuss data trends, feel free to drop a message.
        </p>
      </div>

      {/* 2-Column Hybrid Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column: Direct Info & Social Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Availability Status Badge */}
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {contactInfo.availability}
            </div>
          </div>

          {/* Official Email Card with 1-click Copy */}
          <EmailCopyCard />

          {/* Location & Timezone Card */}
          <div className="p-5 rounded-3xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-m3-1 flex items-center gap-3.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-m3-primary-container text-m3-primary shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-m3-on-surface-variant block">
                Location &amp; Remote
              </span>
              <span className="text-sm font-semibold text-m3-on-surface">
                {contactInfo.location}
              </span>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-6 rounded-3xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-m3-1 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-m3-primary">
              <Sparkles className="w-4 h-4" />
              <span>Social &amp; Professional Profiles</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {SOCIAL_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between p-3 rounded-2xl bg-m3-surface-container border border-m3-outline-variant/20 transition-all duration-200 hover:scale-[1.01] ${item.bgHover}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-m3-surface-container-high flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-m3-on-surface group-hover:text-m3-primary transition-colors flex items-center gap-1.5">
                          <span>{item.name}</span>
                          <ExternalLink className="w-3 h-3 text-m3-on-surface-variant/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-xs text-m3-on-surface-variant">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
