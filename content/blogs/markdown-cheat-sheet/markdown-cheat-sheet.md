---
title: "Markdown Formatting Guide & Cheat Sheet"
date: "2026-10-18"
category: "Guide & Cheatsheet"
thumbnail: "./md-thumbnail.png"
description: "Reference guide for formatting headings, tables, numbered and bullet lists, code snippets, blockquotes, and links."
---

This guide demonstrates every Markdown formatting feature available in your portfolio. You can use this file as a copy-paste template for your future blog posts and projects.

---

# Main Heading 1 (`#`)

Heading 1 is typically used for the top-level section title.

## Heading 2 (`##`)

Heading 2 represents a major sub-section. It comes with a subtle bottom border separator.

### Heading 3 (`###`)

Heading 3 is for secondary sub-topics under an H2.

#### Heading 4 (`####`)

Heading 4 is for smaller categorized paragraphs or step titles.

##### Heading 5 (`#####`) & Heading 6 (`######`)

For deep nested captions or minor sub-labels.

---

## 1. Text Styling & Emphasis

- **Bold text**: `**Bold text**` or `__Bold text__`
- *Italic text*: `*Italic text*` or `_Italic text_`
- ***Bold and Italic***: `***Bold and Italic***`
- ~~Strikethrough~~: `~~Strikethrough~~`
- Inline code: Use backticks `` `SELECT * FROM users` ``

---

## 2. Bullet Lists (Unordered)

Use `-`, `*`, or `+` followed by a space:

- Python (Pandas, NumPy, Matplotlib)
- SQL (PostgreSQL, BigQuery, Snowflake)
- Business Intelligence Tools:
  - Power BI
  - Tableau
  - Looker Studio
- Version Control with Git & GitHub

---

## 3. Numbered Lists (Ordered)

Use numbers followed by a period and a space:

1. **Define the business question:** Identify what KPI needs improvement.
2. **Collect and extract data:** Write SQL queries to pull transaction records.
3. **Clean and transform:** Handle nulls, duplicates, and outliers in Python.
4. **Build visualization:** Create an interactive dashboard for stakeholders.
5. **Report recommendations:** Present actionable insights to leadership.

---

## 4. Tables

Tables use vertical bars `|` and hyphens `-`. You can align columns using colons `:`.

| Skill / Tool | Domain | Proficiency | Primary Use Case |
| :--- | :--- | :---: | :--- |
| **SQL** | Database Querying | Advanced | ETL pipelines, window functions, aggregations |
| **Python** | Data Science | Advanced | Exploratory data analysis, stats, automation |
| **Power BI** | Business Intelligence | Proficient | Executive dashboards, DAX modeling |
| **BigQuery** | Cloud Data Warehouse | Proficient | Serverless petabyte-scale analytics |

> **Alignment Tip:**
> - `:---` aligns left
> - `:---:` aligns center
> - `---:` aligns right

---

## 5. Blockquotes & Callouts

Use `>` at the beginning of a line to create an M3-styled highlight box:

> **Data Analyst Best Practice:**  
> Always validate assumptions with raw row counts and summary statistics before building predictive models or presenting dashboards.

Nested quotes:
> Level 1 quote
>> Nested quote for secondary notes or caveats.

---

## 6. Code Blocks

Wrap code in three backticks ``` with the language name (such as `python`, `sql`, `bash`, or `json`):

### SQL Example:
```sql
-- Calculate monthly retention cohort rate
WITH monthly_cohort AS (
    SELECT 
        user_id,
        DATE_TRUNC('month', signup_date) AS cohort_month
    FROM users
)
SELECT 
    cohort_month,
    COUNT(DISTINCT user_id) AS active_users
FROM monthly_cohort
GROUP BY cohort_month
ORDER BY cohort_month DESC;
```

### Python Example:
```python
import pandas as pd
import numpy as np

# Load dataset and calculate summary stats
df = pd.read_csv("sales_data.csv")
monthly_revenue = df.groupby("month")["revenue"].sum().reset_index()
print(f"Total Annual Revenue: ${monthly_revenue['revenue'].sum():,.2f}")
```

---

## 7. Images & Screenshots

### A. Syntax
```markdown
![Image description](/images/my-chart.png)
*Optional caption below the image*
```

### B. Where to store images:
Save your images in the `public/images/` folder of your project (e.g. `public/images/my-chart.png`).
Next.js will automatically make them available at `/images/my-chart.png`.

### C. Live Image Example:
![Data Analytics Architecture Preview](./placeholder.svg)
*Figure 1: Example data workflow diagram rendered with rounded corners and M3 shadow elevation.*

---

## 8. Links
- **Internal link:** `[Back to all blogs](/blogs)`
- **External link:** `[Visit Google Cloud](https://cloud.google.com)`

## 8. Horizontal Separator Rule

Use three hyphens `---` on a blank line to insert a clean divider line.
