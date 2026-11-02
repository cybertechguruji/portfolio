"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  Users,
  Filter,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export interface DashboardData {
  title?: string;
  subtitle?: string;
  baselineRate?: number;
  totalEncounters?: number;
}

interface ProjectDashboardProps {
  data?: DashboardData | null;
}

export function ProjectDashboard({ data }: ProjectDashboardProps) {
  // Slicers / Filters State
  const [inpatientFilter, setInpatientFilter] = useState<string>("All");
  const [a1cFilter, setA1cFilter] = useState<string>("All");
  const [ageFilter, setAgeFilter] = useState<string>("All");

  // Reset all filters
  const handleReset = () => {
    setInpatientFilter("All");
    setA1cFilter("All");
    setAgeFilter("All");
  };

  const hasActiveFilters =
    inpatientFilter !== "All" || a1cFilter !== "All" || ageFilter !== "All";

  // Dynamic Metrics Calculation based on real hospital readmission findings
  const calculatedMetrics = useMemo(() => {
    let rate = 11.3;
    let sampleSize = 100114;
    let riskLevel: "Normal" | "Elevated" | "High" | "Critical" = "Normal";

    // Inpatient admissions multiplier
    if (inpatientFilter === "0") {
      rate = 8.6;
      sampleSize = 66672;
      riskLevel = "Normal";
    } else if (inpatientFilter === "1") {
      rate = 13.2;
      sampleSize = 19163;
      riskLevel = "Elevated";
    } else if (inpatientFilter === "2") {
      rate = 17.9;
      sampleSize = 7382;
      riskLevel = "High";
    } else if (inpatientFilter === "3+") {
      rate = 26.2;
      sampleSize = 6897;
      riskLevel = "Critical";
    }

    // A1C test impact modifier
    if (a1cFilter === "Tested") {
      rate = Math.max(7.2, +(rate * 0.88).toFixed(1));
      sampleSize = Math.round(sampleSize * 0.169);
    } else if (a1cFilter === "Untested") {
      rate = +(rate * 1.03).toFixed(1);
      sampleSize = Math.round(sampleSize * 0.831);
    }

    // Age modifier
    if (ageFilter === "Senior (60+)") {
      rate = +(rate * 1.05).toFixed(1);
      sampleSize = Math.round(sampleSize * 0.62);
    } else if (ageFilter === "Young Adult (<40)") {
      rate = +(rate * 0.95).toFixed(1);
      sampleSize = Math.round(sampleSize * 0.12);
    }

    const baseline = 11.3;
    const diffFromBaseline = +(rate - baseline).toFixed(1);
    const riskMultiplier = (rate / baseline).toFixed(1);

    return {
      rate: rate.toFixed(1),
      sampleSize: sampleSize.toLocaleString(),
      riskLevel,
      diffFromBaseline,
      riskMultiplier,
    };
  }, [inpatientFilter, a1cFilter, ageFilter]);

  // Bar chart breakdown
  const barData = [
    { label: "0 Prior", rate: 8.6, count: "66,672", id: "0" },
    { label: "1 Prior", rate: 13.2, count: "19,163", id: "1" },
    { label: "2 Prior", rate: 17.9, count: "7,382", id: "2" },
    { label: "3+ Prior (High Risk)", rate: 26.2, count: "6,897", id: "3+" },
  ];

  return (
    <div className="w-full mb-10 rounded-3xl bg-m3-surface-container-lowest border border-m3-outline-variant/30 shadow-m3-2 overflow-hidden">
      {/* SaaS Dashboard Top Bar */}
      <div className="px-5 py-4 bg-m3-surface-container border-b border-m3-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-m3-primary/10 text-m3-primary flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-m3-on-surface">
                {data?.title || "Executive BI Analytics Dashboard"}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Slicers
              </span>
            </div>
            <p className="text-xs text-m3-on-surface-variant">
              Interactive Power BI model simulation • Click any slicer below to filter cohort
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-m3-primary bg-m3-primary-container/40 hover:bg-m3-primary-container transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Slicers</span>
          </button>
        )}
      </div>

      {/* Slicers & Filters Ribbon */}
      <div className="p-4 sm:p-5 bg-m3-surface-container-low/50 border-b border-m3-outline-variant/20">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-m3-on-surface-variant">
          <Filter className="w-3.5 h-3.5 text-m3-primary" />
          <span>Interactive Slicers:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Slicer 1: Prior Admissions */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-m3-on-surface-variant">
              Prior Inpatient Admissions:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["All", "0", "1", "2", "3+"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInpatientFilter(val)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    inpatientFilter === val
                      ? "bg-m3-primary text-m3-on-primary shadow-sm font-semibold"
                      : "bg-m3-surface-container text-m3-on-surface hover:bg-m3-surface-container-high border border-m3-outline-variant/30"
                  }`}
                >
                  {val === "All" ? "All Cohorts" : `${val} Prior`}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 2: A1C Testing */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-m3-on-surface-variant">
              HbA1c Clinical Test:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["All", "Tested", "Untested"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setA1cFilter(val)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    a1cFilter === val
                      ? "bg-m3-primary text-m3-on-primary shadow-sm font-semibold"
                      : "bg-m3-surface-container text-m3-on-surface hover:bg-m3-surface-container-high border border-m3-outline-variant/30"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 3: Age Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-m3-on-surface-variant">
              Patient Age Group:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["All", "Young Adult (<40)", "Senior (60+)"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAgeFilter(val)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    ageFilter === val
                      ? "bg-m3-primary text-m3-on-primary shadow-sm font-semibold"
                      : "bg-m3-surface-container text-m3-on-surface hover:bg-m3-surface-container-high border border-m3-outline-variant/30"
                  }`}
                >
                  {val === "All" ? "All Ages" : val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-m3-on-surface-variant mb-1">
            <span className="font-medium">30-Day Readmission</span>
            <TrendingUp className="w-4 h-4 text-m3-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-m3-on-surface tracking-tight">
            {calculatedMetrics.rate}%
          </div>
          <div className="mt-2 text-[11px] font-semibold flex items-center gap-1">
            {+calculatedMetrics.diffFromBaseline > 0 ? (
              <span className="text-red-500 flex items-center gap-0.5">
                ▲ +{calculatedMetrics.diffFromBaseline}% vs. 11.3% base
              </span>
            ) : +calculatedMetrics.diffFromBaseline < 0 ? (
              <span className="text-emerald-500 flex items-center gap-0.5">
                ▼ {calculatedMetrics.diffFromBaseline}% vs. 11.3% base
              </span>
            ) : (
              <span className="text-m3-on-surface-variant">Baseline overall</span>
            )}
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-m3-on-surface-variant mb-1">
            <span className="font-medium">Active Cohort Size</span>
            <Users className="w-4 h-4 text-m3-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-m3-on-surface tracking-tight">
            {calculatedMetrics.sampleSize}
          </div>
          <div className="mt-2 text-[11px] text-m3-on-surface-variant">
            Patient encounters filtered
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-m3-on-surface-variant mb-1">
            <span className="font-medium">Risk Factor Level</span>
            <AlertTriangle
              className={`w-4 h-4 ${
                calculatedMetrics.riskLevel === "Critical"
                  ? "text-red-500"
                  : calculatedMetrics.riskLevel === "High"
                  ? "text-amber-500"
                  : "text-emerald-500"
              }`}
            />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-m3-on-surface tracking-tight">
            {calculatedMetrics.riskLevel}
          </div>
          <div className="mt-2 text-[11px] font-medium text-m3-on-surface-variant">
            {calculatedMetrics.riskMultiplier}x baseline exposure
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-m3-surface-container-low border border-m3-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-m3-on-surface-variant mb-1">
            <span className="font-medium">HbA1c Compliance</span>
            <CheckCircle2 className="w-4 h-4 text-m3-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-m3-on-surface tracking-tight">
            {a1cFilter === "Tested"
              ? "100%"
              : a1cFilter === "Untested"
              ? "0%"
              : "16.9%"}
          </div>
          <div className="mt-2 text-[11px] text-m3-on-surface-variant">
            Tested patients: 9.9% readmit
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="px-4 pb-6 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Visual: Readmission Rate by Prior Admissions */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-m3-surface-container border border-m3-outline-variant/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-m3-on-surface">
                Readmission Rate by Prior Inpatient Admissions (Primary Risk Driver)
              </h3>
              <p className="text-xs text-m3-on-surface-variant">
                Click any bar to quickly slice by that cohort
              </p>
            </div>
            <span className="text-xs font-medium text-m3-primary bg-m3-primary-container/40 px-2.5 py-1 rounded-full">
              $\chi^2 = 6,376$ (p &lt; 0.001)
            </span>
          </div>

          <div className="space-y-3.5">
            {barData.map((item) => {
              const isSelected = inpatientFilter === item.id;
              const barWidth = `${Math.min(100, (item.rate / 28) * 100)}%`;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    setInpatientFilter(isSelected ? "All" : item.id)
                  }
                  className={`group p-2.5 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-m3-primary-container/30 border-m3-primary"
                      : "bg-m3-surface-container-lowest/80 border-m3-outline-variant/20 hover:border-m3-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-m3-on-surface group-hover:text-m3-primary transition-colors">
                      {item.label}
                    </span>
                    <span className="text-m3-on-surface">
                      {item.rate}%{" "}
                      <span className="text-m3-on-surface-variant font-normal">
                        ({item.count} patients)
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-m3-surface-container-high overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.id === "3+"
                          ? "bg-red-500"
                          : item.id === "2"
                          ? "bg-amber-500"
                          : "bg-m3-primary"
                      }`}
                      style={{ width: barWidth }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supporting Visual: Insight Callout Box */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-m3-surface-container-high/60 border border-m3-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-m3-primary mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Executive Business Insight</span>
            </div>
            <p className="text-xs sm:text-sm text-m3-on-surface leading-relaxed mb-4">
              {inpatientFilter === "3+" ? (
                <>
                  <strong className="text-red-500">Critical Risk:</strong> Patients with 3+
                  prior admissions experience a <strong>26.2% readmission rate</strong>. Flagging
                  this 6.9% group for dedicated 7-day home visits directly targets over 1,800
                  preventable return visits.
                </>
              ) : inpatientFilter === "0" ? (
                <>
                  <strong className="text-emerald-500">Low Risk Baseline:</strong> Patients
                  with zero prior hospitalizations show only an <strong>8.6% readmission rate</strong>.
                  Standard discharge instructions are sufficient, freeing resources for high-risk cohorts.
                </>
              ) : (
                <>
                  <strong>The 3x Risk Multiplier:</strong> Prior admission count is by far the single
                  most actionable predictor. Age showed minimal variation (9.8% to 12.4%), proving
                  that clinical utilization history—not age—drives readmission.
                </>
              )}
            </p>
          </div>

          <div className="pt-3 border-t border-m3-outline-variant/20 text-[11px] text-m3-on-surface-variant flex items-center justify-between">
            <span>Clinical Data: UCI 130-US Hospitals</span>
            <span className="font-semibold text-m3-primary">JCI Metric Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
