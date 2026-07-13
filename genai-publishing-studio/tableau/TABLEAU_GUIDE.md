# Tableau dashboard build

1. Open Tableau Public and connect to `../data/production_log.csv`.
2. Confirm `quality_score`, `hours_saved`, and `ai_hours` are Number (decimal); `approved_first_pass` is Number (whole).
3. Create calculated field **First Pass %**: `AVG([approved_first_pass])` and format as percentage.
4. Build KPI cards for `COUNTD(asset_id)`, `AVG(quality_score)`, `SUM(hours_saved)`, and **First Pass %**.
5. Build bars with `modality` on Rows and `AVG(quality_score)` on Columns.
6. Add `subject` and `modality` filters, then combine sheets into a 1366×768 dashboard.
7. Publish to Tableau Public and add its URL to the website.

All included data is synthetic and safe for a public portfolio.
