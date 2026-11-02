---
title: "Diabetic Patient 30-Day Readmission Risk Analysis"
date: "2026-10-25"
category: "Healthcare Analytics"
thumbnail: "/images/placeholder.svg"
description: "A healthcare analytics project identifying which diabetic patients are at high risk of hospital readmission within 30 days, featuring an interactive BI dashboard and SQL validation."
projectType: "dashboard"
---

A healthcare analytics project identifying which diabetic patients are at high risk of hospital readmission within 30 days, and what a hospital can do about it.

*Portfolio project | Data cleaning, EDA, SQL, statistical testing, interactive BI dashboard*

---

## Business Problem

> Gulam Mustafa Hospital lacks a systematic way to identify which diabetic patients are at high risk of returning to the hospital within 30 days of discharge, resulting in preventable costs and missed opportunities for early intervention.

Hospital readmissions are a critical quality, cost, and reputational metric across healthcare systems globally — including GCC hospitals, where readmission rates are tracked as part of JCI accreditation and align with national health transformation goals such as Saudi Vision 2030.

*(Note: "Gulam Mustafa Hospital" is a fictional name used to frame this portfolio project in a realistic business context. The underlying data is real, publicly available clinical data — see Dataset section below.)*

---

## Stakeholders

| Stakeholder | Role | What they need from this analysis |
| :--- | :--- | :--- |
| **Care Coordinator** | Decision-maker | A prioritized list of high-risk patients to schedule follow-up calls or home visits |
| **CFO** | Influencer | Estimated cost of preventable readmissions to justify budget for intervention programs |
| **Insurance Payer** | Indirectly affected | Visibility into preventable readmission drivers, since they bear repeat hospitalization costs |

---

## Dataset

- **Source:** [UCI Machine Learning Repository — Diabetes 130-US Hospitals for Years 1999–2008](https://archive.ics.uci.edu/dataset/296/diabetes+130-us+hospitals+for+years+1999-2008)
- **Size:** 101,766 patient encounters, 50 columns (100,114 rows / 41 columns after cleaning)
- **Scope:** Ten years of clinical care across 130 US hospitals and integrated delivery networks

---

## Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **Python (pandas)** | Data cleaning, exploratory data analysis, statistical testing |
| **SQL (SQLite)** | Relational querying and validation of key findings |
| **Power BI / React** | Interactive dashboard for stakeholder-facing reporting |
| **Jupyter Notebook** | Documented, reproducible analysis workflow |
| **Git / GitHub** | Version control and portfolio presentation |

---

## Methodology

1. **Data Quality Assessment & Cleaning** — Removed 1,652 records for deceased patients (not eligible for readmission), dropped 9 columns with zero/near-zero variance or excessive missingness, and recoded missing values as explicit categories where missingness itself could be a meaningful signal (e.g., `payer_code`, `medical_specialty`).
2. **Exploratory Data Analysis** — Tested 5 hypotheses against the cleaned dataset, using both Python and SQL to cross-validate results.
3. **Statistical Validation** — Applied Chi-Square tests of independence to confirm findings were unlikely to be due to random chance, while explicitly distinguishing statistical significance from practical/business significance.
4. **Dashboard Development** — Built an interactive dashboard with 4 KPIs, supporting visualizations, and stakeholder-relevant slicers.
5. **Business Insights & Recommendations** — Converted findings into stakeholder-specific, actionable recommendations.

---

## Key Findings

| Factor | Finding | Strength |
| :--- | :--- | :--- |
| **Prior inpatient admissions** | Readmission rate rises from 8.6% (0 prior admissions) to 26.2% (3+ prior admissions) | **Strong** — primary risk driver |
| **Age** | Rate stays roughly flat (9.8%–12.4%) across most adult age groups | **Weak** — not a meaningful driver, despite intuitive expectations |
| **Length of stay** | Rate rises from 8.4% (1 day) to ~14.5% (8+ days), likely reflecting case severity | **Moderate-strong**, correlational not causal |
| **A1C testing** | Untested patients show a higher readmission rate (11.6%) than tested patients (9.9%), despite only 16.9% of patients being tested | **Modest but highly actionable** |

Statistical testing confirmed both `number_inpatient` ($\chi^2 = 6,376$) and `age` ($\chi^2 = 357.7$) as technically significant ($p < 0.05$) — but the much larger effect size for `number_inpatient` demonstrates it as the far more practically important factor for intervention targeting.

---

## SQL Analysis

```sql
-- Query: Readmission Rate by Prior Inpatient Admission History
SELECT
    CASE
        WHEN number_inpatient = 0 THEN '0 inpatient'
        WHEN number_inpatient = 1 THEN '1 inpatient'
        WHEN number_inpatient = 2 THEN '2 inpatient'
        WHEN number_inpatient >= 3 THEN '3+ inpatient'
    END AS inpatient_bucket,
    COUNT(*) AS total_patients,
    SUM(CASE WHEN readmitted = '<30' THEN 1 ELSE 0 END) AS readmitted_30_count,
    ROUND(SUM(CASE WHEN readmitted = '<30' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS readmit_30_pct
FROM patient_encounters
GROUP BY inpatient_bucket;
```

---

## Executive Recommendations

1. **Flag and follow up with high-repeat patients:** Patients with 2+ prior admissions should be flagged at discharge for a follow-up call or home visit within 7 days.
2. **Start discharge planning earlier for complex, long-stay patients:** Begin discharge planning as soon as a patient's stay exceeds 5 days, rather than waiting until the day of discharge.
3. **Standardize A1C testing for all diabetic inpatients:** Make HbA1c testing a routine part of inpatient diabetes care rather than an inconsistent, case-by-case decision.

---

## Repository & Links

- **GitHub Repository:** [cybertechguruji/diabetic-readmission-risk-analysis](https://github.com/cybertechguruji/diabetic-readmission-risk-analysis)
- **Dataset:** UCI Machine Learning Repository
