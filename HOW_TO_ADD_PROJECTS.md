# 🚀 Standard Operating Procedure (SOP): How to Add New Projects

This guide contains everything you need to create, structure, and publish a new portfolio project by yourself across all **3 project view types** (`standard`, `notebook`, and `dashboard`).

---

## 📌 Quick Rules to Remember
1. Every project lives inside its own folder under:  
   `content/projects/<your-project-slug>/`
2. The folder name becomes the URL slug on your website:  
   `content/projects/customer-churn-analysis/` ➔ `https://yoursite.com/projects/customer-churn-analysis`
3. The main file inside the folder must always be named:  
   `index.md`
4. Co-located images: You can place screenshots, charts, and thumbnails directly inside that project folder! The website will automatically copy and link them.

---

## 🧭 Which Project View Type Should You Choose?

| Project Type | When to Choose | Key Files Needed in Folder |
|---|---|---|
| **1. Standard View** (`projectType: "standard"`) | Best for SQL analyses, database modeling, business strategy, Excel, or non-notebook case studies. | `index.md` + optional screenshots |
| **2. Jupyter Notebook View** (`projectType: "notebook"`) | Best for Python data science, machine learning, statistical modeling, and deep exploratory data analysis (EDA). | `index.md` + `notebook.ipynb` |
| **3. Interactive Dashboard View** (`projectType: "dashboard"`) | Best for Power BI, Tableau, or executive BI reporting projects where you want an interactive slicer canvas. | `index.md` + optional `dashboard.json` |

---

# 1️⃣ Type 1: Standard Case Study (`projectType: "standard"`)

Use this when writing an in-depth, article-style technical case study (e.g. SQL projects, Business Analytics).

### Folder Structure:
```text
content/projects/customer-churn-analysis/
├── index.md             <-- The complete written case study
├── thumbnail.png        <-- 16:9 preview cover
└── er_diagram.png       <-- Embedded schema/diagram (optional)
```

### Complete Copy-Paste Template for `index.md`:
```markdown
---
title: "Customer Churn Prediction & Revenue Retention Analysis"
date: "2026-11-01"
category: "SQL & Business Analytics"
thumbnail: "/images/churn-thumbnail.png"
description: "A comprehensive SQL-driven exploratory analysis identifying key churn drivers and designing a $450K retention strategy."
projectType: "standard"
---

A data-driven investigation into customer subscription churn, identifying root-cause attrition triggers and providing executive recommendations to preserve recurring revenue.

*Portfolio Project | SQL (PostgreSQL), Cohort Analysis, Window Functions, Business Strategy*

---

## 1. Executive Summary

- **The Problem:** The company experienced an annualized customer churn rate of 18.4%, representing roughly $1.2M in lost Annual Recurring Revenue (ARR).
- **The Core Insight:** 72% of all churn events occurred within the first 60 days of onboarding, with month-to-month contract holders churning at 5x the rate of annual subscribers.
- **The Financial Impact:** Implementing an early-stage onboarding intervention and a targeted annual plan incentive is projected to retain $450,000 in at-risk ARR.

---

## 2. Business Problem & Context

> "Why are newly acquired customers leaving before their second billing cycle, and what operational changes will maximize long-term customer lifetime value (LTV)?"

High customer acquisition costs (CAC) make early churn particularly damaging to unit economics. The leadership team needed to move beyond aggregate churn percentages and understand the specific behavioral signals indicating a customer is about to leave.

---

## 3. Stakeholders & Objectives

| Stakeholder | Role | Primary Objective |
| :--- | :--- | :--- |
| **Head of Growth** | Decision-maker | Identify low-retention acquisition channels and adjust ad spend |
| **Customer Success Lead** | Operator | Deploy targeted proactive outreach to users showing early drop-off signals |
| **CFO** | Influencer | Understand expected net revenue retention (NRR) and ARR preservation |

---

## 4. The Dataset & Architecture

- **Source:** Internal relational database dump (PostgreSQL)
- **Scale:** 85,000 customer accounts across 3 years of billing history
- **Primary Tables:** `customers`, `subscriptions`, `support_tickets`, `payment_logs`

### Schema Overview:
![Database Schema](./er_diagram.png)

---

## 5. SQL Analysis & Data Cleaning

Data validation revealed duplicate subscription events and missing cancellation reasons. The following query performs a 60-day cohort retention analysis using window functions:

```sql
WITH customer_cohorts AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', signup_date) AS cohort_month,
        contract_type,
        monthly_charges
    FROM customers
),
churn_events AS (
    SELECT
        customer_id,
        cancellation_date,
        DATEDIFF('day', signup_date, cancellation_date) AS tenure_days
    FROM subscriptions
    WHERE status = 'cancelled'
)
SELECT
    c.cohort_month,
    c.contract_type,
    COUNT(c.customer_id) AS total_customers,
    SUM(CASE WHEN e.tenure_days <= 60 THEN 1 ELSE 0 END) AS early_churn_count,
    ROUND(SUM(CASE WHEN e.tenure_days <= 60 THEN 1 ELSE 0 END) * 100.0 / COUNT(c.customer_id), 1) AS early_churn_pct
FROM customer_cohorts c
LEFT JOIN churn_events e ON c.customer_id = e.customer_id
GROUP BY 1, 2
ORDER BY 1 DESC;
```

---

## 6. Key Findings & Strategic Insights

1. **Contract Type is the Dominant Predictor:** Month-to-month contracts had a **41.8%** churn rate, whereas annual contracts experienced only **3.2%** churn.
2. **Support Ticket Friction:** Accounts filing 3+ unresolved support tickets in month 1 churned at an **83%** rate within 45 days.
3. **Payment Method Vulnerability:** Credit cards with failed recurring billing attempts accounted for 22% of passive (involuntary) churn.

---

## 7. Business Recommendations & Projected ROI

1. **Incentivize Annual Commitment at Onboarding:** Offer a 15% discount on annual billing during the first 14 days to shift high-risk monthly users into long-term retention tiers.
2. **Automate Dunning & Failed Payment Alerts:** Implement automated email/SMS reminders for expiring credit cards to eliminate passive churn.
3. **Flag High-Ticket Accounts for Dedicated CS Review:** Trigger automated priority alerts for any customer with 2+ open tickets in their first 30 days.

---

## 8. Repository & Resources

- **GitHub Repository:** [github.com/cybertechguruji/customer-churn-sql](https://github.com/cybertechguruji)
- **Full SQL Scripts:** Available in `/sql/churn_queries.sql`
```

---

# 2️⃣ Type 2: Jupyter Notebook View (`projectType: "notebook"`)

Use this when you have an executed Python Jupyter notebook (`.ipynb`) with code, charts, and tables that you want embedded directly inside your narrative.

### Folder Structure:
```text
content/projects/borrower-default-risk/
├── index.md             <-- Case study with the {{notebook}} tag
├── notebook.ipynb       <-- The real Jupyter notebook file!
└── thumbnail.png        <-- 16:9 preview cover
```

### Complete Copy-Paste Template for `index.md`:
```markdown
---
title: "Borrower Credit Risk Default Prediction"
date: "2026-10-25"
category: "Machine Learning & Risk"
thumbnail: "/images/credit-risk-thumbnail.png"
description: "A machine learning risk project predicting 2-year loan default risk with 95.6% recall using class weighting and threshold tuning."
projectType: "notebook"
---

A credit risk analytics project predicting which borrowers are likely to experience serious loan delinquency within 2 years, using real lending data and a logistic regression model.

*Portfolio Project | Python (pandas, scikit-learn), Class Imbalance, Precision-Recall Tuning*

---

## 1. Business Problem & Context

> Lenders face millions in avoidable loan write-offs when approving borrowers with subtle risk factors. Missing an actual defaulter costs the entire loan principal, making high recall far more valuable than raw accuracy.

---

## 2. Dataset & Features

- **Source:** Kaggle — Give Me Some Credit
- **Size:** 150,000 borrower records, 11 features
- **Target:** `SeriousDlqin2yrs` (Imbalanced: ~6.7% default rate)

---

## 3. Methodology & Modeling Strategy

1. **Missing Data Imputation:** Preserved missing income signals using an `Income_Was_Missing` indicator flag.
2. **Imbalanced Learning:** Applied `class_weight='balanced'` in scikit-learn to prevent the model from ignoring the minority default class.
3. **Threshold Tuning:** Lowered the classification cutoff from the standard 0.50 to **0.30** to maximize defaulter recall.

---

## 4. Interactive Python Analysis & Model Execution

The complete, executed Jupyter analysis notebook is embedded below. Use the toggle button in the top bar to switch between **Executive Mode** (charts and dataframes only) and **Developer Mode** (full Python code):

{{notebook}}

---

## 5. Key Findings

| Factor | Finding |
| :--- | :--- |
| **Prior 90+ Day Delinquency** | Default rate jumps from 4.6% (0 times) to 60.5% (3+ times) — the single strongest predictor. |
| **Borrower Age** | Default rate drops steadily from 11.7% (20s) to 2.3% (70+). |
| **Model Recall** | Tuning the decision threshold to 0.30 catches **95.6% of actual defaulters** (vs. 67.0% on default 0.50). |

---

## 6. Business Impact & Recommendations

1. **Automatic Manual Review for Severe Delinquencies:** Any applicant with even one 90+ day late payment must require senior underwriter approval.
2. **Adopt the Tuned 0.30 Threshold:** Accepting a slight increase in false alarms preserves millions in protected loan principal.

---

## 7. Repository & Notebook Download

- **GitHub Repository:** [cybertechguruji/credit-risk-default-prediction](https://github.com/cybertechguruji)
- **Raw Notebook:** Included in repository as `notebook.ipynb`
```

### 💡 Pro Tip for Notebooks:
Make sure your `.ipynb` notebook has been **run and saved with outputs** in VS Code or JupyterLab before copying it into the folder. The website reads the pre-computed chart images, tables, and terminal print outputs directly from the notebook file!

---

# 3️⃣ Type 3: Interactive Dashboard View (`projectType: "dashboard"`)

Use this for Power BI or Tableau business intelligence projects where an interactive dashboard canvas sits at the top of the case study.

### Folder Structure:
```text
content/projects/diabetic-readmission-risk/
├── index.md             <-- The complete business case study
└── thumbnail.png        <-- 16:9 preview cover
```

### Complete Copy-Paste Template for `index.md`:
```markdown
---
title: "Diabetic Patient 30-Day Readmission Risk Analysis"
date: "2026-10-25"
category: "Healthcare Analytics"
thumbnail: "/images/diabetic-thumbnail.png"
description: "A healthcare analytics project identifying which diabetic patients are at high risk of 30-day hospital readmission, featuring interactive BI slicers."
projectType: "dashboard"
---

A healthcare analytics project identifying which diabetic patients are at high risk of hospital readmission within 30 days, and what clinical teams can do to intervene early.

*Portfolio Project | Data Cleaning, EDA, SQL Validation, Interactive BI Dashboard*

---

## 1. Business Problem

> Hospital readmissions within 30 days of discharge cause preventable clinical complications and trigger severe regulatory penalties under healthcare quality programs.

---

## 2. Stakeholders & Usage

| Stakeholder | Role | How They Use This Dashboard |
| :--- | :--- | :--- |
| **Care Coordinator** | Decision-maker | Filters by high-risk categories to schedule post-discharge follow-up calls |
| **Chief Medical Officer** | Executive | Tracks hospital-wide 30-day readmission trends against quality benchmarks |

---

## 3. Dataset & Preprocessing

- **Source:** UCI Machine Learning Repository (Diabetes 130-US Hospitals)
- **Volume:** 101,766 patient encounters across 10 years
- **Cleaning:** Resolved missing laboratory values, mapped medication changes, and standardized admission source codes.

---

## 4. Key Findings from the Dashboard

1. **Prior Hospital Visits:** Patients with 2 or more inpatient admissions in the preceding year experienced a **3x higher** readmission rate.
2. **HbA1c Testing Impact:** Patients whose HbA1c was measured and resulted in a medication change had lower readmission rates than unmonitored patients.

---

## 5. Clinical Recommendations

1. **Mandate 48-Hour Follow-Up for Multi-Admission Patients:** Prioritize high-frequency patients for automated telehealth check-ins.
2. **Standardize Inpatient HbA1c Screening:** Ensure glycemic control protocols are enforced prior to discharge.

---

## 6. Project Links

- **GitHub Repository:** [cybertechguruji/diabetic-readmission-risk](https://github.com/cybertechguruji)
- **Power BI File (.pbix):** Available in repository `/dashboard/` folder.
```

---

## 🖼️ Thumbnail Image Best Practices
1. **Aspect Ratio:** Use **16:9** (e.g. `1280x720` or `1920x1080` pixels).
2. **Format:** `.png`, `.jpg`, or `.webp`.
3. **Where to place it:** 
   - You can put it in `/public/images/your-project-thumbnail.png` and reference it as:
     `thumbnail: "/images/your-project-thumbnail.png"`
   - Or put it right inside your project folder as `thumbnail.png` and reference it as:
     `thumbnail: "./thumbnail.png"`

---

## 🧪 How to Verify Locally
Whenever you add a new project, verify it in your local browser:

1. Open your terminal in `E:\Antigravity Projects\portfolio`.
2. Run:
   ```powershell
   npm run dev
   ```
3. Open `http://localhost:3000/projects` (or `3001`).
4. Your new project card will be immediately visible on both the **Home Page** and the **Projects Page**, complete with your tags, date, and thumbnail!

---

*Keep this file handy for reference whenever you're ready to publish your next data analytics project!*
