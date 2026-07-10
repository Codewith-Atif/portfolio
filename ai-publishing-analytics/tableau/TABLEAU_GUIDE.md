# Tableau Public Build Guide

## 1. Connect the data

1. Open Tableau Public.
2. Choose **Text file** and select `../data/publishing_projects.csv`.
3. Confirm dates are Date, numeric measures are Number (decimal), and project ID is String.

The included `publishing_analytics.twb` is a starter workbook that points to the CSV. If Tableau cannot locate the file after unzipping, use **Data → Replace Data Source** and select the local CSV.

## 2. Create calculated fields

**On-time Flag**
```tableau
IF [on_time] = "Yes" THEN 1 ELSEIF [status] = "Completed" THEN 0 END
```

**First-pass Flag**
```tableau
IF [first_pass_approved] = "Yes" THEN 1 ELSEIF [status] = "Completed" THEN 0 END
```

**On-time Rate**
```tableau
AVG([On-time Flag])
```

**First-pass Rate**
```tableau
AVG([First-pass Flag])
```

**Cost Saving %**
```tableau
SUM([cost_saved_inr]) / SUM([baseline_cost_inr])
```

## 3. Build sheets

1. **KPI Projects** — `COUNTD(project_id)` on Text.
2. **KPI On-time** — `On-time Rate` on Text, format as percentage.
3. **KPI Quality** — `AVG(quality_score)` on Text, one decimal.
4. **KPI Savings** — `SUM(cost_saved_inr)` on Text, currency ₹.
5. **Monthly Trend** — Month of `created_date` on Columns, `COUNTD(project_id)` on Rows, Line mark.
6. **Workflow Comparison** — `workflow` on Rows; `AVG(quality_score)` and `AVG(actual_hours)` as measures.
7. **Department Output** — `department` on Rows, `COUNTD(project_id)` on Columns, sorted descending.
8. **Content Rework** — `content_type` on Rows, `AVG(revisions)` on Columns.

## 4. Dashboard design

- Size: Automatic, minimum desktop width 1200 px.
- Add filters for workflow, department, content type, status, and created date.
- Apply each filter to all worksheets using the same data source.
- Use dark green `#18201F`, teal `#0A776D`, mint `#BEE9DC`, and warm background `#F5F4EF`.
- Add a note: “Synthetic portfolio data — no employer or customer information.”

## 5. Publish

1. **Server → Tableau Public → Save to Tableau Public**.
2. Name it `AI Publishing Operations Analytics – Atif`.
3. Copy the public dashboard URL.
4. Add the URL to the portfolio project card and README.
