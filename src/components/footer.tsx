"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import { contactInfo } from "@/data/contact";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: contactInfo.socials.linkedin,
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: contactInfo.socials.github,
    icon: FaGithub,
  },
  {
    label: "YouTube",
    href: contactInfo.socials.youtube,
    icon: FaYoutube,
  },
  {
    label: "Twitter / X",
    href: contactInfo.socials.twitter,
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: contactInfo.socials.instagram,
    icon: FaInstagram,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-m3-outline-variant/30 bg-m3-surface-container-low text-m3-on-surface-variant">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 w-fit group focus:outline-none"
              aria-label="Home"
            >
              <Image
                src="/images/logo.png"
                alt="CyberTech Guruji logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain transition-transform group-hover:scale-105 duration-200"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-base tracking-tight text-m3-on-surface group-hover:text-m3-primary transition-colors leading-tight">
                  CyberTech Guruji
                </span>
                <span className="text-[11px] tracking-wider uppercase font-medium leading-none mt-0.5 text-m3-on-surface-variant">
                  Data Analyst
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs">
              Turning raw data into clear stories — through dashboards, notebooks,
              and write-ups that actually make sense.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full text-m3-on-surface-variant hover:text-m3-primary hover:bg-m3-surface-container transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation column ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-m3-on-surface">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-m3-primary transition-colors duration-150 w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Contact / CTA column ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-m3-on-surface">
              Get in Touch
            </h3>
            <p className="text-sm">
              Open to freelance projects, full-time roles, and interesting data
              conversations.
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm text-m3-primary hover:underline underline-offset-4 w-fit"
            >
              {contactInfo.email}
            </a>
            <Link
              href="/contact"
              className="mt-1 inline-flex items-center justify-center w-fit px-5 py-2 rounded-full text-sm font-medium bg-m3-primary text-m3-on-primary hover:opacity-90 active:scale-95 shadow-m3-1 transition-all duration-200"
            >
              Contact Me
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-m3-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-m3-on-surface-variant">
          <span>© {year} CyberTech Guruji. All rights reserved.</span>
          <span className="text-center sm:text-right">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-m3-primary transition-colors"
            >
              Next.js
            </a>{" "}
            &amp;{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-m3-primary transition-colors"
            >
              Tailwind CSS
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
