# Hospital ERP System & Analytics

An end-to-end data analyst portfolio project that models hospital administrative workflows and turns synthetic operational data into decision-ready insights.

## Live demo

After deployment: `https://codewith-atif.github.io/portfolio/hospital-erp-analytics/`

## Business problem

Hospital leaders need a unified view of patient flow, bed utilization, appointment outcomes, revenue collection, waiting time, length of stay, and readmissions. This project demonstrates how an analyst can connect ERP-style operational tables to reproducible reporting.

## Deliverables

- Responsive HTML/CSS/JavaScript executive dashboard with light/dark mode, search, filtering, and CSV export
- Relational SQL schema and 15 business queries using joins, CTEs, aggregations, and window functions
- Python ETL and KPI pipeline with validation checks and Tableau-ready outputs
- Excel dashboard workbook with formulas, formatted raw data, KPI cards, department summaries, and charts
- Tableau dashboard build guide and cleaned CSV extract
- Data dictionary, assumptions, and privacy note

## Repository structure

```text
hospital-erp-analytics/
├── index.html, style.css, script.js
├── data/hospital_encounters.csv
├── excel/Hospital_ERP_Analytics.xlsx
├── python/etl_analysis.py
├── sql/schema.sql
├── sql/analysis_queries.sql
├── tableau/Tableau_Dashboard_Guide.md
└── docs/data_dictionary.md
```

## KPIs

Total patients, admissions, average wait time, average length of stay, bed occupancy, cancellation/no-show rate, billed revenue, collection rate, and 30-day readmission rate.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000/hospital-erp-analytics/`.

For the analytics pipeline:

```bash
pip install -r requirements.txt
python python/etl_analysis.py
```

## Data ethics

All records are synthetic and created only for portfolio demonstration. No real patient, clinical, or personally identifiable information is included. This dashboard is an administrative analytics prototype, not a clinical decision-support system.

## Resume talking points

- Designed an ERP-style healthcare data model connecting encounters, appointments, billing, departments, and operational KPIs.
- Automated validation and KPI generation in Python and authored reusable SQL queries for patient-flow and revenue analysis.
- Built recruiter-friendly web and Excel dashboards with responsive layouts, light/dark mode, drill-down style filtering, and exportable results.

## Author

Mohd Atif — Data Analyst  
[GitHub](https://github.com/Codewith-Atif) • [Portfolio](https://codewith-atif.github.io/portfolio/)
