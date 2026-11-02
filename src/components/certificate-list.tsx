"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { BadgeCheck, ExternalLink, X, ZoomIn } from "lucide-react";
import type { Certification } from "@/data/about";

interface Props {
  certifications: Certification[];
}

export function CertificateList({ certifications }: Props) {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActiveCert(null);
    }
  }, []);

  useEffect(() => {
    if (activeCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCert, handleKeyDown]);

  return (
    <>
      <div className="max-w-4xl flex flex-col gap-4">
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="bg-m3-surface rounded-2xl border border-m3-outline-variant/30 p-4 sm:p-5 shadow-m3-1 hover:shadow-m3-2 hover:border-m3-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            {/* Left: Interactive Preview Thumbnail + Info */}
            <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
              {cert.image && (
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  aria-label={`Preview certificate for ${cert.title}`}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-m3-surface-container border border-m3-outline-variant/20 shrink-0 flex items-center justify-center shadow-xs cursor-pointer group/thumb focus:outline-none focus:ring-2 focus:ring-m3-primary"
                >
                  {/* Ambient blur */}
                  <Image
                    src={cert.image}
                    alt=""
                    fill
                    sizes="80px"
                    aria-hidden="true"
                    className="object-cover scale-125 blur-md opacity-35 dark:opacity-20 pointer-events-none"
                  />
                  {/* Crisp Foreground thumbnail */}
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="80px"
                    className="object-contain relative z-10 p-1 transition-transform duration-200 group-hover/thumb:scale-105"
                  />
                  {/* Zoom Indicator Overlay on Hover */}
                  <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="w-5 h-5 drop-shadow-sm" />
                  </div>
                </button>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg text-m3-on-surface leading-snug group-hover:text-m3-primary transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs sm:text-sm text-m3-on-surface-variant font-medium mt-1 flex items-center gap-1.5 flex-wrap">
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.year}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 ml-1">
                    <BadgeCheck className="w-3 h-3" />
                    Verified
                  </span>
                </p>

                {/* Skill Tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-m3-surface-container text-m3-on-surface border border-m3-outline-variant/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: View Credential Action */}
            {cert.credentialUrl && (
              <div className="shrink-0 sm:self-center mt-2 sm:mt-0">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-m3-primary text-m3-on-primary text-xs sm:text-sm font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs w-full sm:w-fit"
                >
                  <span>View Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Certificate Preview Modal / Lightbox ── */}
      {activeCert && activeCert.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveCert(null)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-m3-surface rounded-3xl border border-m3-outline-variant/30 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-m3-outline-variant/25 bg-m3-surface-container-low">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <h4 className="font-bold text-sm sm:text-base text-m3-on-surface truncate">
                  {activeCert.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeCert.credentialUrl && (
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-m3-primary text-m3-on-primary hover:opacity-95 transition-all shadow-xs"
                  >
                    <span>Verify on Coursera</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded-full text-m3-on-surface-variant hover:text-m3-on-surface hover:bg-m3-surface-container transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High-Resolution Certificate Canvas */}
            <div className="relative w-full flex-1 min-h-[50vh] sm:min-h-[60vh] max-h-[75vh] bg-zinc-950/40 p-4 sm:p-6 flex items-center justify-center overflow-auto">
              <div className="relative w-full h-full min-h-[350px] sm:min-h-[480px]">
                <Image
                  src={activeCert.image}
                  alt={activeCert.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="py-2.5 px-4 text-center text-xs text-m3-on-surface-variant bg-m3-surface-container-low border-t border-m3-outline-variant/20">
              Press <kbd className="px-1.5 py-0.5 rounded-md bg-m3-surface border border-m3-outline-variant/30 text-[10px] font-mono">ESC</kbd> or click anywhere outside to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}
