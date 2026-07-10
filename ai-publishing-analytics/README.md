# AI Publishing Operations Analytics

A portfolio-ready, end-to-end data analytics project that connects Generative AI prompt-engineering experience in print and publishing with a Data Analyst role.

## Business problem

A fictional educational publisher uses AI-assisted content production across editorial teams. Leadership needs to understand throughput, quality, turnaround time, rework, cost savings, and prompt-template performance without exposing confidential company data.

## What this project demonstrates

- **Python:** synthetic-data generation, cleaning, KPI calculation, and QA checks
- **SQL:** reusable schema plus 12 business queries using CTEs and window functions
- **Excel:** formatted source table, formula-driven KPI dashboard, summary tables, and charts
- **Tableau:** cleaned extract, data dictionary, calculated fields, and dashboard build guide
- **HTML/CSS/JavaScript:** responsive, interactive recruiter-facing dashboard deployable on GitHub Pages

## Headline insights from the included demo data

- Compare AI-assisted and manual production on cycle time and cost.
- Find which content types and prompt templates create the most rework.
- Track first-pass approval, quality score, on-time delivery, and monthly output.
- Drill down by month, department, content type, workflow, and status.

> All records are synthetic and reproducible. No employer or customer data is used.

## Quick start

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python python/generate_data.py
python python/analyze.py
python -m http.server 8000
```

Open `http://localhost:8000`.

## Project structure

```text
ai-publishing-analytics/
├── index.html                 # Live dashboard
├── css/style.css
├── js/app.js
├── data/
│   ├── publishing_projects.csv
│   ├── monthly_summary.csv
│   ├── dashboard_metrics.json
│   └── data_dictionary.csv
├── python/
│   ├── generate_data.py
│   └── analyze.py
├── sql/
│   ├── schema.sql
│   └── analysis_queries.sql
├── excel/Publishing_Analytics.xlsx
├── tableau/
│   ├── publishing_analytics.twb
│   └── TABLEAU_GUIDE.md
├── tests/test_pipeline.py
├── DEPLOYMENT_GUIDE.md
├── requirements.txt
└── LICENSE
```

## KPI definitions

| KPI | Definition |
|---|---|
| Projects | Count of unique publishing jobs |
| On-time rate | Completed jobs delivered on or before due date / completed jobs |
| First-pass approval | Jobs approved without rework / completed jobs |
| Avg. quality | Average editorial quality score, 0–100 |
| Hours saved | Estimated manual hours minus actual hours |
| Cost saved | Estimated manual cost minus actual cost |

## Recruiter talking points

1. I translated a real publishing workflow into measurable operational KPIs.
2. I built a reproducible pipeline rather than a one-off dashboard.
3. I used the same metric definitions across Python, SQL, Excel, Tableau, and the web app.
4. I protected confidentiality by using realistic synthetic data and documenting its limitations.

## Suggested portfolio description

**AI Publishing Operations Analytics** — Built an end-to-end analytics solution using Python, SQL, Excel, Tableau, and JavaScript to measure AI-assisted editorial throughput, quality, rework, turnaround time, and cost savings. Designed a reproducible synthetic dataset, reusable KPI queries, an executive workbook, and an interactive GitHub Pages dashboard.

## License

MIT — see [LICENSE](LICENSE).
