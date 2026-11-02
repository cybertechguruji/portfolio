---
title: "Borrower Credit Risk Default Prediction"
date: "2026-10-25"
category: "Machine Learning & Risk"
thumbnail: "/images/placeholder.svg"
description: "A credit risk analytics project predicting which borrowers are likely to experience serious loan delinquency within 2 years, using real lending data, logistic regression, and decision threshold tuning."
projectType: "notebook"
---

A credit risk analytics project predicting which borrowers are likely to experience serious loan delinquency within 2 years, using real lending data and a logistic regression model.

*Portfolio project | Data cleaning, EDA, predictive modeling, class imbalance handling, decision threshold optimization*

---

## Business Problem

> Al-Rajab Lenders lacks a systematic way to identify borrowers likely to delay payment for 2 years, resulting in preventable capital losses from approving high-risk loans.

---

## Stakeholders

| Stakeholder | Role | What they need from this analysis |
| :--- | :--- | :--- |
| **Loan Approving Manager** | Decision-maker | Reliable borrower risk signals to improve approval decisions |
| **CFO** | Influencer | Visibility into expected defaults to manage capital reserves |
| **Shareholders** | Indirectly affected | Protection of profitability and stock value from avoidable loan losses |

---

## Dataset

- **Source:** [Kaggle — Give Me Some Credit](https://www.kaggle.com/c/GiveMeSomeCredit/data)
- **Size:** 150,000 borrower records, 11 features (149,999 after cleaning)
- **Target variable:** `SeriousDlqin2yrs` — whether the borrower experienced 90+ day delinquency within 2 years (imbalanced: ~6.7% positive class)

---

## Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **Python (pandas)** | Data cleaning and exploratory data analysis |
| **scikit-learn** | Logistic regression modeling, train-test splitting, feature scaling |
| **SQL (SQLite)** | Independent validation of key EDA findings |
| **Jupyter Notebook** | Documented, reproducible analysis workflow |
| **Matplotlib** | Supporting visualizations, including the model's threshold trade-off curve |

---

## Methodology

1. **Data Cleaning** — Removed 1 invalid record (`age = 0`), imputed missing `MonthlyIncome` and `NumberOfDependents` with median values, and added an `Income_Was_Missing` flag to preserve the missingness signal rather than discard it.
2. **Exploratory Data Analysis** — Tested hypotheses on prior late-payment history and borrower age against default outcomes.
3. **Predictive Modeling** — Built a logistic regression model with stratified train-test splitting and feature scaling, explicitly addressing class imbalance with `class_weight='balanced'`.
4. **Threshold Tuning** — Evaluated the recall/precision trade-off across multiple decision thresholds, since the default 0.5 threshold caught only 67% of actual defaulters.
5. **Business Insights** — Converted statistical findings into stakeholder-specific recommendations.

---

## Key Findings

| Factor | Finding |
| :--- | :--- |
| **Prior 90+ day late payments** | Default rate rises from 4.6% (0 instances) to 60.5% (3+ instances) — the strongest predictor found |
| **Borrower age** | Default rate falls steadily from 11.7% (20s) to 2.3% (70+) |

---

## Python Modeling & Visualizations

The complete, executed Jupyter analysis notebook is embedded below. Use the toggle button in the top bar to switch between **Executive Mode** (charts and dataframes only) and **Developer Mode** (full Python code):

{{notebook}}

---

## SQL Analysis

Key EDA findings were independently validated in SQL against a relational database, cross-checking the Python-based results:

```sql
SELECT
    CASE
        WHEN NumberOfTimes90DaysLate = 0 THEN '0 times'
        WHEN NumberOfTimes90DaysLate = 1 THEN '1 time'
        WHEN NumberOfTimes90DaysLate = 2 THEN '2 times'
        WHEN NumberOfTimes90DaysLate >= 3 THEN '3+ times'
    END AS late_90_bucket,
    COUNT(*) AS total_borrowers,
    SUM(CASE WHEN SeriousDlqin2yrs = 1 THEN 1 ELSE 0 END) AS default_count,
    ROUND(SUM(CASE WHEN SeriousDlqin2yrs = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS default_pct
FROM borrowers
GROUP BY late_90_bucket;
```

---

## Model Performance & Threshold Tuning

A naive "always predict no default" baseline achieves 93.3% accuracy while catching **zero** actual defaulters — a clear example of why accuracy alone is misleading on imbalanced data.

| Metric | Dummy Baseline | Logistic Regression (threshold = 0.5) | Tuned Model (threshold = 0.3) |
| :--- | :--- | :--- | :--- |
| **Accuracy** | 93.3% | 77.0% | **73.4%** |
| **Recall (catches actual defaulters)** | 0% | 67.0% | **95.6%** |
| **Precision** | — | 17.7% | **18.9%** |

> **Threshold tuning insight:** Since missing an actual defaulter (losing the full loan principal) is assumed to be costlier than a false alarm (losing only potential interest income), recall was prioritized over raw accuracy. Lowering the decision threshold to **~0.3 raises recall to 95.6%** while keeping the model practically usable.

---

## Business Recommendations

1. **Flag any borrower with even one instance of 90+ day late payment for stricter review:** Risk jumps 7x (4.6% $\rightarrow$ 33.7%) at just one occurrence.
2. **Apply risk-adjusted scrutiny for younger applicants (20s-30s):** Who default at roughly 5x the rate of borrowers aged 70+.
3. **Adopt a tuned decision threshold (~0.3) rather than the default 0.5:** Catch significantly more actual defaulters, accepting a higher false-alarm rate as a reasoned business trade-off.

---

## Repository & Links

- **GitHub Repository:** [cybertechguruji/credit-risk-default-prediction](https://github.com/cybertechguruji/credit-risk-default-prediction)
- **Dataset:** Kaggle Give Me Some Credit
