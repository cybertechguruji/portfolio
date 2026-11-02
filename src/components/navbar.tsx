"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { FileDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-m3-surface/85 border-b border-m3-outline-variant/30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Brand Name / Logo -> Links to Hero */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Home"
          >
            <Image
              src="/images/logo.png"
              alt="CyberTech Guruji logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain transition-transform group-hover:scale-105 duration-200"
              priority
            />
            <div className="flex flex-col">
              <span className="font-semibold text-base sm:text-lg tracking-tight text-m3-on-surface group-hover:text-m3-primary transition-colors leading-tight">
                CyberTech Guruji
              </span>
              <span className="text-[11px] text-m3-on-surface-variant tracking-wider uppercase font-medium leading-none mt-0.5">
                Data Analyst
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-m3-secondary-container text-m3-on-secondary-container font-semibold shadow-sm"
                      : "text-m3-on-surface-variant hover:text-m3-on-surface hover:bg-m3-surface-container"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Resume Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />

            {/* M3 Pill Resume Download Button */}
            <a
              href="/resume.pdf"
              download="Resume.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-m3-primary text-m3-on-primary hover:opacity-95 active:scale-95 shadow-m3-1 hover:shadow-m3-2 transition-all duration-200"
            >
              <FileDown className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-m3-on-surface hover:bg-m3-surface-container transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-m3-outline-variant/30 bg-m3-surface-container-low px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-2xl text-base font-medium transition-colors ${isActive
                      ? "bg-m3-secondary-container text-m3-on-secondary-container font-semibold"
                      : "text-m3-on-surface-variant hover:text-m3-on-surface hover:bg-m3-surface-container"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-m3-outline-variant/20">
            <a
              href="/resume.pdf"
              download="Resume.pdf"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-medium bg-m3-primary text-m3-on-primary shadow-m3-1 active:scale-95 transition-all"
            >
              <FileDown className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
