DROP TABLE IF EXISTS production_assets;
CREATE TABLE production_assets(asset_id TEXT PRIMARY KEY,modality TEXT NOT NULL,subject TEXT NOT NULL,quality_score REAL,revisions INTEGER,ai_hours REAL,estimated_manual_hours REAL,hours_saved REAL,approved_first_pass INTEGER);

-- Recruiter query: performance and efficiency by modality
SELECT modality,COUNT(*) assets,ROUND(AVG(quality_score),1) avg_quality,
 ROUND(100.0*AVG(approved_first_pass),1) first_pass_pct,
 ROUND(SUM(hours_saved),1) hours_saved
FROM production_assets GROUP BY modality ORDER BY avg_quality DESC;

-- Find formats that need prompt or QA improvement
WITH performance AS (
 SELECT modality,AVG(revisions) avg_revisions,AVG(quality_score) avg_quality
 FROM production_assets GROUP BY modality)
SELECT * FROM performance WHERE avg_revisions>0.7 OR avg_quality<88;
