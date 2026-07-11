CREATE TABLE employees(employee_id TEXT PRIMARY KEY,age INT,gender TEXT,department TEXT,job_role TEXT,job_level INT,years_at_company INT,monthly_income REAL,overtime TEXT,job_satisfaction INT,engagement_score INT,performance_rating REAL,attrition TEXT,review_month TEXT);
CREATE VIEW vw_employee_kpis AS SELECT *,CASE WHEN attrition='Yes' THEN 1 ELSE 0 END attrition_flag FROM employees;
-- Executive KPIs
SELECT COUNT(*) headcount,ROUND(100.0*AVG(attrition_flag),1) attrition_pct,ROUND(AVG(monthly_income),0) avg_income,ROUND(AVG(years_at_company),1) avg_tenure,ROUND(AVG(engagement_score),1) engagement FROM vw_employee_kpis;
-- Department benchmark
SELECT department,COUNT(*) headcount,ROUND(100.0*AVG(attrition_flag),1) attrition_pct,ROUND(AVG(performance_rating),2) performance,ROUND(AVG(monthly_income),0) avg_income FROM vw_employee_kpis GROUP BY department ORDER BY attrition_pct DESC;
-- Attrition drivers
SELECT overtime,job_satisfaction,CASE WHEN years_at_company<2 THEN '0-1' WHEN years_at_company<5 THEN '2-4' WHEN years_at_company<10 THEN '5-9' ELSE '10+' END tenure_band,COUNT(*) employees,ROUND(100.0*AVG(attrition_flag),1) attrition_pct FROM vw_employee_kpis GROUP BY overtime,job_satisfaction,tenure_band ORDER BY attrition_pct DESC;
-- Monthly trend with rolling average
WITH m AS(SELECT review_month,COUNT(*) headcount,100.0*AVG(attrition_flag) attrition_rate FROM vw_employee_kpis GROUP BY review_month) SELECT *,ROUND(AVG(attrition_rate) OVER(ORDER BY review_month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW),1) rolling_3m_attrition FROM m;
