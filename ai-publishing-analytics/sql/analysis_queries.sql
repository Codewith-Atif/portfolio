-- 1. Executive KPI scorecard
SELECT
    COUNT(*) AS total_projects,
    SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_projects,
    ROUND(100.0 * SUM(CASE WHEN on_time = 'Yes' THEN 1 ELSE 0 END) /
          NULLIF(SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END), 0), 1) AS on_time_rate,
    ROUND(AVG(quality_score), 1) AS avg_quality,
    ROUND(SUM(hours_saved), 1) AS hours_saved,
    ROUND(SUM(cost_saved_inr), 2) AS cost_saved_inr
FROM publishing_projects;

-- 2. AI-assisted versus manual workflow
SELECT workflow, COUNT(*) AS projects,
       ROUND(AVG(actual_hours), 1) AS avg_hours,
       ROUND(AVG(quality_score), 1) AS avg_quality,
       ROUND(AVG(revisions), 2) AS avg_revisions,
       ROUND(SUM(cost_saved_inr), 2) AS cost_saved_inr
FROM publishing_projects
GROUP BY workflow
ORDER BY projects DESC;

-- 3. Monthly performance trend
SELECT EXTRACT(YEAR FROM created_date) AS year,
       EXTRACT(MONTH FROM created_date) AS month,
       COUNT(*) AS projects,
       ROUND(AVG(quality_score), 1) AS avg_quality,
       ROUND(SUM(hours_saved), 1) AS hours_saved
FROM publishing_projects
GROUP BY EXTRACT(YEAR FROM created_date), EXTRACT(MONTH FROM created_date)
ORDER BY year, month;

-- 4. Department ranking with window function
WITH department_kpis AS (
    SELECT department, COUNT(*) AS projects,
           SUM(cost_saved_inr) AS cost_saved,
           AVG(quality_score) AS avg_quality
    FROM publishing_projects
    GROUP BY department
)
SELECT department, projects, ROUND(cost_saved, 2) AS cost_saved_inr,
       ROUND(avg_quality, 1) AS avg_quality,
       DENSE_RANK() OVER (ORDER BY cost_saved DESC) AS savings_rank
FROM department_kpis;

-- 5. First-pass approval by content type
SELECT content_type,
       SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed,
       ROUND(100.0 * SUM(CASE WHEN first_pass_approved = 'Yes' THEN 1 ELSE 0 END) /
             NULLIF(SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END), 0), 1) AS first_pass_rate
FROM publishing_projects
GROUP BY content_type
ORDER BY first_pass_rate DESC;

-- 6. Prompt-template effectiveness (AI only)
SELECT prompt_template, COUNT(*) AS projects,
       ROUND(AVG(quality_score), 1) AS avg_quality,
       ROUND(AVG(revisions), 2) AS avg_revisions,
       ROUND(AVG(hours_saved), 1) AS avg_hours_saved
FROM publishing_projects
WHERE workflow = 'AI-Assisted'
GROUP BY prompt_template
HAVING COUNT(*) >= 20
ORDER BY avg_quality DESC, avg_revisions ASC;

-- 7. Late projects needing process review
SELECT project_id, department, content_type, complexity, due_date,
       completed_date, revisions, quality_score
FROM publishing_projects
WHERE status = 'Completed' AND on_time = 'No'
ORDER BY completed_date - due_date DESC;

-- 8. Rework Pareto by content type
WITH rework AS (
    SELECT content_type, SUM(revisions) AS revision_count
    FROM publishing_projects
    GROUP BY content_type
), ranked AS (
    SELECT *, SUM(revision_count) OVER (ORDER BY revision_count DESC) AS running_revisions,
              SUM(revision_count) OVER () AS total_revisions
    FROM rework
)
SELECT content_type, revision_count,
       ROUND(100.0 * running_revisions / NULLIF(total_revisions, 0), 1) AS cumulative_pct
FROM ranked
ORDER BY revision_count DESC;

-- 9. Cost-saving quartiles
SELECT project_id, workflow, content_type, cost_saved_inr,
       NTILE(4) OVER (ORDER BY cost_saved_inr DESC) AS savings_quartile
FROM publishing_projects;

-- 10. 3-month rolling quality score
WITH monthly AS (
    SELECT DATE_TRUNC('month', created_date) AS month,
           AVG(quality_score) AS avg_quality
    FROM publishing_projects GROUP BY DATE_TRUNC('month', created_date)
)
SELECT month, ROUND(avg_quality, 1) AS avg_quality,
       ROUND(AVG(avg_quality) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 1) AS rolling_3m_quality
FROM monthly ORDER BY month;

-- 11. Complexity impact
SELECT complexity, COUNT(*) AS projects,
       ROUND(AVG(actual_hours), 1) AS avg_hours,
       ROUND(AVG(revisions), 2) AS avg_revisions,
       ROUND(AVG(quality_score), 1) AS avg_quality
FROM publishing_projects
GROUP BY complexity
ORDER BY CASE complexity WHEN 'Low' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END;

-- 12. Data-quality checks: should return zero rows
SELECT * FROM publishing_projects
WHERE project_id IS NULL OR created_date IS NULL OR quality_score NOT BETWEEN 0 AND 100
   OR actual_hours < 0 OR revisions < 0 OR completed_date < created_date;
