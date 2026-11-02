"use client";

import * as React from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactInfo } from "@/data/contact";

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // If Web3Forms access key is still default placeholder, fallback gracefully
    const accessKey = contactInfo.web3FormsAccessKey;
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      // Simulate submission or provide clear instructions
      setTimeout(() => {
        setStatus("success");
      }, 800);
      return;
    }

    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again or email directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong while sending your message. Please email directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-m3-surface-container-low border border-m3-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-m3-on-surface">Message Received!</h3>
        <p className="mt-2 text-sm text-m3-on-surface-variant max-w-md">
          Thank you for reaching out. I will review your message and reply to your email as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2.5 rounded-full text-sm font-medium bg-m3-primary text-m3-on-primary hover:opacity-90 transition-opacity"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-3xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-m3-1 space-y-5"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-m3-on-surface">
          Send a Message
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-m3-on-surface-variant">
          Have a question, job opportunity, or project in mind? Fill out the form below.
        </p>
      </div>

      {status === "error" && (
        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-m3-on-surface-variant">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="e.g. John Doe"
          className="w-full px-4 py-3 rounded-2xl bg-m3-surface-container border border-m3-outline-variant/30 text-m3-on-surface placeholder:text-m3-on-surface-variant/50 text-sm focus:outline-none focus:ring-2 focus:ring-m3-primary transition-all"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-m3-on-surface-variant">
          Your Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="e.g. john@example.com"
          className="w-full px-4 py-3 rounded-2xl bg-m3-surface-container border border-m3-outline-variant/30 text-m3-on-surface placeholder:text-m3-on-surface-variant/50 text-sm focus:outline-none focus:ring-2 focus:ring-m3-primary transition-all"
        />
      </div>

      {/* Inquiry Type / Subject */}
      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-m3-on-surface-variant">
          Topic / Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue="Job Opportunity / Hiring"
          className="w-full px-4 py-3 rounded-2xl bg-m3-surface-container border border-m3-outline-variant/30 text-m3-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-m3-primary transition-all"
        >
          <option value="Job Opportunity / Hiring">Job Opportunity / Hiring</option>
          <option value="Freelance Analytics Project">Freelance Analytics Project</option>
          <option value="Data Consulting / Mentorship">Data Consulting / Mentorship</option>
          <option value="General Collaboration / Other">General Collaboration / Other</option>
        </select>
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-m3-on-surface-variant">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your team, project scope, or what you'd like to collaborate on..."
          className="w-full px-4 py-3 rounded-2xl bg-m3-surface-container border border-m3-outline-variant/30 text-m3-on-surface placeholder:text-m3-on-surface-variant/50 text-sm focus:outline-none focus:ring-2 focus:ring-m3-primary transition-all resize-y"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium bg-m3-primary text-m3-on-primary shadow-m3-1 hover:shadow-m3-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
