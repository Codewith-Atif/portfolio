# Airport Analytics Dashboard

Recruiter-ready end-to-end data analytics portfolio project for airport operations and passenger-flow decision support.

## Business problem

Airport leaders need one view of on-time performance, delays, passenger demand, terminal congestion, security wait times, baggage delivery, load factor and airline/route performance. This project turns flight-level operational data into drill-down KPIs and actionable insights.

## Tech stack

- Python: data generation, cleaning, validation and KPI export
- SQL: analytical views, CTEs and window-function queries
- Excel: analysis-ready workbook with formatted data and KPI summary
- Tableau: dashboard blueprint and calculated fields
- Power BI: star-schema, DAX measures and build guide
- HTML/CSS/JavaScript: responsive live dashboard for GitHub Pages

## Quick start

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python python/generate_data.py
python python/analyze.py
```

Then open `index.html` in a browser. The repository already contains a generated sample dataset, so the dashboard works without running Python.

## Dashboard features

- Date, terminal and airline filters
- KPI cards for flights, passengers, on-time performance, average delay, security wait and baggage delivery
- Daily passenger trend
- Delay-cause breakdown
- Terminal congestion comparison
- Airline performance table
- Peak-hour passenger heatmap
- Executive insights generated from the filtered data
- CSV export of the filtered view

## Project structure

```text
airport-analytics-dashboard/
├── index.html
├── css/styles.css
├── js/app.js
├── data/airport_operations.csv
├── python/generate_data.py
├── python/analyze.py
├── sql/airport_analytics.sql
├── powerbi/POWER_BI_BUILD_GUIDE.md
├── tableau/TABLEAU_BUILD_GUIDE.md
├── excel/README.md
├── docs/data_dictionary.md
└── assets/airport-dashboard-preview.svg
```

## Key definitions

- **On-time:** departure delay is 15 minutes or less.
- **Load factor:** passengers divided by seat capacity.
- **Average delay:** mean departure-delay minutes.
- **Security wait:** mean terminal security queue time.
- **Baggage delivery:** minutes from arrival to first-bag delivery.

## Interview talking points

1. Designed a star-schema-compatible dataset at flight grain.
2. Defined operational KPIs consistently across SQL, Python, Power BI and Tableau.
3. Added drill-down filters to isolate airline, terminal and time-period drivers.
4. Used delay-cause and peak-hour analysis to translate metrics into staffing and turnaround recommendations.
5. Published a dependency-light dashboard on GitHub Pages for recruiter access.

## Disclaimer

The dataset is synthetic and created for portfolio demonstration. It contains no real passenger or commercially sensitive information.
