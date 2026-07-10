# Tableau Dashboard Build Guide

1. Run `python python/etl_analysis.py` to create `outputs/tableau_encounter_extract.csv` and `outputs/tableau_department_summary.csv`.
2. Connect Tableau Public to the encounter extract.
3. Create calculated fields: `Collection Rate = SUM([collected_amount]) / SUM([billed_amount])`; `Readmission Rate = AVG([readmitted_30d])`; `Average LOS = AVG([bed_days])`.
4. Build KPI tiles for patients, encounters, wait time, LOS, collections, and readmission rate.
5. Add a monthly dual-line view for encounters and collections, a department bar chart, encounter-mix donut, and department performance table.
6. Add filters for month, department, encounter type, and appointment status. Apply to all worksheets.
7. Use teal for normal performance, amber for watch, and red for exceptions. Add a subtitle stating “Synthetic portfolio data.”
8. Publish to Tableau Public and paste the view URL into this project README and portfolio card if desired.
