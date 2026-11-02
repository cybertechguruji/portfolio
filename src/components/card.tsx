import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export interface ContentCardProps {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  category?: string;
  date?: string;
  description?: string;
}

export function ContentCard({
  title,
  href,
  imageSrc,
  imageAlt = "Thumbnail",
  category,
  date,
  description,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col w-full h-full no-underline focus:outline-none"
    >
      <div
        className="flex flex-col w-full h-full p-3.5 rounded-2xl 
                   bg-m3-surface-container-low border border-m3-outline-variant/30
                   shadow-m3-1 hover:shadow-m3-2
                   transition-all duration-300 ease-out
                   hover:scale-[1.02] active:scale-[0.99]
                   group-hover:border-m3-primary/50"
      >
        {/* Top Thumbnail Image - 16:9 Ambient Blur Container */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-m3-surface-container border border-m3-outline-variant/20 flex items-center justify-center shadow-xs">
          {/* Ambient blurred background to fill letterbox areas for mixed aspect ratios (e.g. 4:3, 1:1) */}
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            aria-hidden="true"
            className="object-cover scale-125 blur-lg opacity-40 dark:opacity-25 pointer-events-none"
          />

          {/* Crisp foreground image (never cropped) */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Card Body - flex-1 & flex-col ensures unified bottom alignment across all cards */}
        <div className="w-full pt-3 pb-1 px-1 flex-1 flex flex-col justify-between text-left">
          <div>
            {(category || date) && (
              <div className="flex items-center justify-between gap-2 text-[11px] font-medium mb-1.5 px-0.5">
                {category ? (
                  <span className="text-m3-primary tracking-wide uppercase font-semibold text-[11px] truncate">
                    {category}
                  </span>
                ) : (
                  <span />
                )}
                {date && (
                  <span className="text-m3-on-surface-variant/80 text-[11px] flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3 opacity-70" />
                    {date}
                  </span>
                )}
              </div>
            )}
            <h3 className="mt-0.5 text-base font-semibold text-m3-on-surface group-hover:text-m3-primary transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </div>

          {description && (
            <p className="mt-2 text-xs text-m3-on-surface-variant line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
