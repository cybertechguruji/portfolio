"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageSquareQuote, Quote } from "lucide-react";
import type { Testimonial } from "@/data/about";

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const hasTestimonials = testimonials && testimonials.length > 0;

  const next = useCallback(() => {
    if (!hasTestimonials) return;
    setIndex((i) => (i + 1) % testimonials.length);
  }, [hasTestimonials, testimonials?.length]);

  const prev = () => {
    if (!hasTestimonials) return;
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused || !hasTestimonials || testimonials.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next, hasTestimonials, testimonials?.length]);

  if (!hasTestimonials) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center p-8 rounded-3xl bg-m3-surface-container border border-m3-outline-variant/30 shadow-m3-1">
        <div className="w-12 h-12 rounded-2xl bg-m3-primary-container mx-auto flex items-center justify-center text-m3-on-primary-container mb-4">
          <MessageSquareQuote className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-m3-on-surface">
          Recommendations Coming Soon
        </h3>
        <p className="mt-2 text-sm text-m3-on-surface-variant max-w-md mx-auto leading-relaxed">
          Currently gathering feedback from past stakeholders and analytics
          collaborators. Have we worked together?
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-m3-primary text-m3-on-primary hover:opacity-90 transition-all shadow-xs"
        >
          <span>Share a Recommendation</span>
        </Link>
      </div>
    );
  }

  const t = testimonials[index];

  return (
    <div
      className="w-full max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Quote card ── */}
      <div className="bg-m3-surface-container rounded-3xl p-8 md:p-10 shadow-m3-1 flex flex-col min-h-[200px]">
        <Quote className="w-8 h-8 text-m3-primary mb-4 opacity-50 shrink-0" />

        <p className="text-m3-on-surface text-base md:text-lg leading-relaxed flex-1 italic">
          &ldquo;{t.quote}&rdquo;
        </p>

        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-m3-outline-variant/30">
          {t.avatar ? (
            <Image
              src={t.avatar}
              alt={t.name}
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-m3-primary-container flex items-center justify-center text-m3-on-primary-container font-bold text-base shrink-0">
              {t.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-semibold text-m3-on-surface text-sm leading-tight">
              {t.name}
            </p>
            <p className="text-xs text-m3-on-surface-variant mt-0.5">
              {t.role}
              {t.company ? ` · ${t.company}` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-between mt-5 px-1">
          {/* Prev / Next arrows */}
          <div className="flex gap-1">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2.5 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container hover:text-m3-primary transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2.5 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container hover:text-m3-primary transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === index
                    ? "w-5 h-2 bg-m3-primary"
                    : "w-2 h-2 bg-m3-outline-variant hover:bg-m3-on-surface-variant"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
