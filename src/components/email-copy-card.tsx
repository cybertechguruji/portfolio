"use client";

import * as React from "react";
import { Mail, Copy, Check } from "lucide-react";
import { contactInfo } from "@/data/contact";

export function EmailCopyCard() {
  const [copied, setCopied] = React.useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 rounded-3xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-m3-1 space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-m3-primary">
        <Mail className="w-4 h-4" />
        <span>Official Email</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-m3-surface-container border border-m3-outline-variant/20">
        <a
          href={`mailto:${contactInfo.email}`}
          className="text-sm font-semibold text-m3-on-surface hover:text-m3-primary hover:underline transition-colors break-all"
        >
          {contactInfo.email}
        </a>
        <button
          type="button"
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-m3-surface-container-high hover:bg-m3-surface-container-highest text-m3-on-surface transition-colors focus:outline-none"
          title="Copy email to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-m3-on-surface-variant" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
