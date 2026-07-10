# Textile Operations & Quality Analytics

An end-to-end Data Analyst portfolio project based on textile manufacturing operations. It turns production, quality, machine, shift and order data into business KPIs and an interactive executive dashboard.

## Business problem

Management needs one view of output, efficiency, defects, downtime, waste, order value and delivery performance across plants, production lines, shifts and fabric categories.

## Highlights

- 1,500 realistic synthetic production records covering Jan-Dec 2025
- Python pipeline for data generation, cleaning, KPI calculation and charts
- SQL schema plus 15 business queries using CTEs and window functions
- Excel workbook with Raw Data, KPI Summary, Monthly Trend and Data Dictionary sheets
- Tableau-ready CSV and a build guide with calculated fields
- Responsive HTML/CSS/JavaScript dashboard with filters and downloadable data

## Headline results from the supplied dataset

- Production efficiency: 91.4%
- First-pass quality yield: 96.7%
- On-time delivery: 92.2%
- Defect rate: 3.3%
- Waste rate: 3.9%
- Estimated order value: INR 18.7 crore

## Project structure

```text
textile-operations-analytics/
├── index.html
├── css/style.css
├── js/app.js
├── data/textile_production_data.csv
├── data/dashboard_summary.json
├── python/generate_and_analyze.py
├── sql/schema.sql
├── sql/business_queries.sql
├── excel/Textile_Operations_Analytics.xlsx
├── tableau/TABLEAU_BUILD_GUIDE.md
├── docs/DATA_DICTIONARY.md
├── docs/GITHUB_UPLOAD_GUIDE.md
├── requirements.txt
└── LICENSE
```

## Run locally

```bash
pip install -r requirements.txt
python python/generate_and_analyze.py
python -m http.server 8000
```

Open `http://localhost:8000/textile-operations-analytics/`.

## Tools demonstrated

Python (Pandas, NumPy, Matplotlib), SQL, Excel, Tableau, HTML5, CSS3 and JavaScript.

## Data note

The dataset is synthetic and contains no confidential employer or customer information. It is designed to resemble textile production operations for portfolio demonstration.

## Author

Mohd Atif — Data Analyst | Data Supervisor (Textiles)
