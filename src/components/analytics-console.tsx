import { Activity, Database, Sparkles, TrendingUp, Zap } from "lucide-react";

export function AnalyticsConsole() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-m3-primary/20 via-m3-secondary/20 to-m3-primary/10 rounded-3xl blur-xl opacity-70 pointer-events-none" />

      {/* Main Console Container */}
      <div className="relative bg-m3-surface-container rounded-3xl p-6 md:p-7 border border-m3-outline-variant/30 shadow-m3-2 transition-all">
        {/* Console Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-m3-outline-variant/25">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-m3-on-surface tracking-wider uppercase">
              Analytics Workflow
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-m3-on-surface-variant bg-m3-surface-container-low px-2.5 py-1 rounded-full border border-m3-outline-variant/20">
            <Activity className="w-3 h-3 text-m3-primary" />
            <span>Portfolio Metrics</span>
          </div>
        </div>

        {/* 3 Metric KPI Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <div className="bg-m3-surface rounded-2xl p-3 border border-m3-outline-variant/15 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-medium text-m3-on-surface-variant uppercase tracking-wider">
              Recall
            </span>
            <span className="text-lg md:text-xl font-bold text-m3-primary mt-0.5">
              95.6%
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Credit Risk Model
            </span>
          </div>

          <div className="bg-m3-surface rounded-2xl p-3 border border-m3-outline-variant/15 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-medium text-m3-on-surface-variant uppercase tracking-wider">
              Report Prep
            </span>
            <span className="text-lg md:text-xl font-bold text-m3-secondary mt-0.5">
              &lt;30 min
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Down from ~3 hours
            </span>
          </div>

          <div className="bg-m3-surface rounded-2xl p-3 border border-m3-outline-variant/15 text-center flex flex-col items-center justify-center">
            <span className="text-[11px] font-medium text-m3-on-surface-variant uppercase tracking-wider">
              Analyzed
            </span>
            <span className="text-lg md:text-xl font-bold text-m3-on-surface mt-0.5">
              250K+
            </span>
            <span className="text-[10px] text-m3-on-surface-variant font-medium">
              Records Across Projects
            </span>
          </div>
        </div>

        {/* Visual Chart Graphic with SVG Sparkline */}
        <div className="bg-m3-surface rounded-2xl p-4 border border-m3-outline-variant/20 mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-m3-primary" />
              <span className="text-xs font-semibold text-m3-on-surface">
                Analytics Workflow
              </span>
            </div>
            <span className="text-[10px] text-m3-on-surface-variant">
              SQL → Python → Power BI
            </span>
          </div>

          {/* SVG Vector Area Chart */}
          <div className="relative w-full h-24 overflow-hidden rounded-lg">
            <svg
              viewBox="0 0 320 90"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--m3-primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--m3-primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="22" x2="320" y2="22" stroke="currentColor" className="text-m3-outline-variant/15" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="320" y2="50" stroke="currentColor" className="text-m3-outline-variant/15" strokeDasharray="3 3" />
              <line x1="0" y1="78" x2="320" y2="78" stroke="currentColor" className="text-m3-outline-variant/15" strokeDasharray="3 3" />

              {/* Area Fill */}
              <path
                d="M 0,75 Q 40,65 80,50 T 160,40 T 240,25 T 320,12 L 320,90 L 0,90 Z"
                fill="url(#chartGradient)"
              />
              {/* Trend Stroke Line */}
              <path
                d="M 0,75 Q 40,65 80,50 T 160,40 T 240,25 T 320,12"
                fill="none"
                stroke="var(--m3-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* End Point Indicator */}
              <circle cx="320" cy="12" r="4" fill="var(--m3-primary)" className="animate-ping opacity-75" />
              <circle cx="320" cy="12" r="3.5" fill="var(--m3-primary)" />
            </svg>
          </div>
        </div>

        {/* Data Transformation Pipeline Flow */}
        <div className="flex items-center justify-between gap-1 p-2.5 rounded-xl bg-m3-surface-container-low border border-m3-outline-variant/20 text-[11px] font-medium text-m3-on-surface-variant">
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3 text-m3-primary" />
            <span>Raw SQL</span>
          </span>
          <span className="text-m3-outline-variant">→</span>
          <span className="flex items-center gap-1 text-m3-primary font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Python ML</span>
          </span>
          <span className="text-m3-outline-variant">→</span>
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-m3-secondary" />
            <span>Power BI</span>
          </span>
        </div>
      </div>


      {/* Floating Accent Chip - Bottom Left */}
      <div className="hidden sm:flex absolute -bottom-3 -left-3 items-center gap-1.5 px-3 py-1.5 rounded-full bg-m3-surface text-m3-on-surface text-xs font-semibold shadow-m3-2 border border-m3-outline-variant/30">
        <span className="w-2 h-2 rounded-full bg-m3-primary" />
        <span>High-Precision DAX</span>
      </div>
    </div>
  );
}
