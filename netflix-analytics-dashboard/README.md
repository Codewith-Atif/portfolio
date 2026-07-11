# Netflix Analytics Dashboard

Recruiter-ready, end-to-end Data Analyst portfolio project that turns a 1,200-row synthetic streaming catalog into executive business intelligence. The project demonstrates Python data preparation, SQL analysis, an Excel reporting layer, a Tableau build blueprint, and a responsive HTML/CSS/JavaScript dashboard.

## Live dashboard

After adding this folder to the portfolio repository, open:
`https://codewith-atif.github.io/portfolio/netflix-analytics-dashboard/`

## Business questions

- How quickly is the catalog growing by release year?
- What is the balance between movies and TV shows?
- Which genres, ratings, and countries dominate the catalog?
- How recent is the catalog, and where are concentration risks?
- How can executives filter records and move from KPIs to title-level detail?

## Tools demonstrated

| Layer | Tool | Evidence |
|---|---|---|
| Data preparation | Python | `python/generate_data.py`, `python/analysis.py` |
| Querying | SQL | schema, indexes, KPI and trend queries in `sql/` |
| Reporting | Excel | formatted workbook in `excel/` |
| BI design | Tableau | dashboard construction guide in `tableau/` |
| Deployment | HTML, CSS, JavaScript | responsive dashboard with theme and cross-filters |

## Features

- Five executive KPIs and dynamically generated insight cards
- Type, country, rating, release-year, and search filters
- Trend, content mix, genre, rating, and country visualizations
- Record-level catalog explorer
- Persistent light/dark mode
- Desktop, tablet, and mobile layouts
- Static GitHub Pages deployment—no backend required

## Run locally

```bash
cd netflix-analytics-dashboard
python -m http.server 8000
```

Visit `http://localhost:8000`. To reproduce the data and profiling output:

```bash
python python/generate_data.py
python python/analysis.py
```

## Data note

The included dataset is deterministic synthetic data built for portfolio demonstration. It does not claim to represent Netflix's current catalog and avoids redistribution/licensing ambiguity. “Netflix” is used nominatively to describe the analytics case study; this project is not affiliated with or endorsed by Netflix.

## Project structure

```text
assets/       dashboard CSS and JavaScript
data/         analysis-ready CSV
excel/        executive Excel workbook
python/       reproducible data generation and profiling
sql/          schema and business queries
tableau/      Tableau Public build blueprint
docs/         portfolio integration and deployment guide
```

## Author

Mohd Atif — Data Analyst | Python | SQL | Excel | Tableau | Business Intelligence
