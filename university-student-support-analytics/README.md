# University Student Support Analytics

An end-to-end data analytics portfolio project inspired by enterprise onsite support work in higher education. It converts a realistic, privacy-safe service-desk workflow into measurable KPIs and recruiter-friendly business recommendations.

> **Privacy:** all 1,500 records are synthetic and reproducible. No real student name, registration number, contact detail, employer, client, or university data is included.

## Business problem

University support teams handle fee, examination, enrollment, scholarship, document, result, timetable, and portal-access queries across multiple channels. Leaders need a consistent view of demand, backlog, SLA compliance, resolution time, first-contact resolution, reopened tickets, and student satisfaction.

## Technology demonstrated

- **Python:** deterministic data generation, transformation, KPI calculation, and quality checks
- **SQL:** schema, indexes, CTEs, conditional aggregation, and window functions
- **Excel:** formatted source table, formula-driven KPIs, summary tables, and native charts
- **Tableau:** dashboard plan, field definitions, calculated fields, and ready-to-connect CSV
- **HTML/CSS/JavaScript:** responsive interactive dashboard for GitHub Pages

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

Open `http://localhost:8000/university-student-support-analytics/` if serving from the portfolio root.

## Project structure

```text
university-student-support-analytics/
├── index.html                 # Live interactive dashboard
├── assets/css/style.css
├── assets/js/app.js
├── data/                      # Synthetic source + summary outputs
├── python/                    # Generation and analysis pipeline
├── sql/                       # Schema and eight business queries
├── excel/                     # Formula-driven Excel dashboard
├── tableau/                   # Tableau build guide and data source
├── tests/                     # Pipeline checks
├── docs/                      # Data dictionary and publishing guide
├── requirements.txt
└── LICENSE
```

## KPI definitions

| KPI | Definition |
|---|---|
| Total queries | Count of unique support tickets |
| SLA compliance | Closed tickets resolved within the priority target / closed tickets |
| Average resolution | Mean hours to resolve closed tickets |
| First-contact resolution | Closed tickets completed at first contact / closed tickets |
| CSAT | Mean satisfaction score for closed tickets, out of 5 |
| Reopen rate | Reopened closed tickets / closed tickets |

## Resume-ready description

**University Student Support Analytics** — Built an end-to-end operations analytics solution using Python, SQL, Excel, Tableau, and JavaScript to analyze 1,500 synthetic student support queries. Designed KPI definitions for SLA compliance, resolution time, first-contact resolution, backlog, reopen rate, and CSAT; automated data quality checks and published an interactive GitHub Pages dashboard.

## Interview talking points

1. I translated onsite support activities into a measurable service operations model.
2. I used synthetic data to demonstrate domain knowledge without exposing protected student information.
3. I maintained consistent KPI definitions across Python, SQL, Excel, Tableau, and the web dashboard.
4. I separated operational facts from presentation layers so the solution can scale to a database later.

## License

MIT — see [LICENSE](LICENSE).
