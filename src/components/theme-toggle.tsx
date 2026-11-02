"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-m3-surface-container" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-m3-surface-container-high text-m3-on-surface hover:bg-m3-surface-container-highest transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-m3-primary"
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-300 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-m3-primary transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
