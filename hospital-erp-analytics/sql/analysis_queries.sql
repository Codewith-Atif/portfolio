-- 1. Executive KPI summary
SELECT COUNT(DISTINCT patient_id) AS patients, COUNT(*) AS encounters,
       ROUND(AVG(wait_minutes),1) AS avg_wait_minutes, ROUND(AVG(bed_days),1) AS avg_los_days,
       SUM(billed_amount) AS billed, SUM(collected_amount) AS collected,
       ROUND(100.0*SUM(collected_amount)/NULLIF(SUM(billed_amount),0),1) AS collection_rate_pct
FROM encounters;

-- 2. Department performance
SELECT department, COUNT(*) encounters, COUNT(DISTINCT patient_id) patients,
       ROUND(AVG(wait_minutes),1) avg_wait, ROUND(AVG(bed_days),1) avg_los,
       SUM(collected_amount) revenue,
       ROUND(100.0*AVG(readmitted_30d),1) readmission_rate_pct
FROM encounters GROUP BY department ORDER BY revenue DESC;

-- 3. Monthly patient-flow trend
SELECT strftime('%Y-%m', admit_date) month, COUNT(*) admissions,
       SUM(CASE WHEN discharge_date IS NOT NULL THEN 1 ELSE 0 END) discharges
FROM encounters GROUP BY month ORDER BY month;

-- 4. Appointment leakage
SELECT appointment_status, COUNT(*) total,
       ROUND(100.0*COUNT(*)/SUM(COUNT(*)) OVER (),1) share_pct
FROM encounters GROUP BY appointment_status ORDER BY total DESC;

-- 5. Rank departments by revenue
WITH d AS (SELECT department, SUM(collected_amount) revenue FROM encounters GROUP BY department)
SELECT department, revenue, DENSE_RANK() OVER (ORDER BY revenue DESC) revenue_rank FROM d;

-- 6. Departments above hospital average wait time
SELECT department, ROUND(AVG(wait_minutes),1) avg_wait
FROM encounters GROUP BY department
HAVING AVG(wait_minutes) > (SELECT AVG(wait_minutes) FROM encounters)
ORDER BY avg_wait DESC;

-- 7. 30-day readmission rate by encounter type
SELECT encounter_type, COUNT(*) encounters, SUM(readmitted_30d) readmissions,
       ROUND(100.0*AVG(readmitted_30d),1) readmission_rate_pct
FROM encounters GROUP BY encounter_type;

-- 8. Outstanding billed amount by department
SELECT department, SUM(billed_amount-collected_amount) outstanding_amount
FROM encounters GROUP BY department ORDER BY outstanding_amount DESC;

-- 9. Running monthly collections
WITH m AS (SELECT strftime('%Y-%m', admit_date) month, SUM(collected_amount) collected FROM encounters GROUP BY month)
SELECT month, collected, SUM(collected) OVER (ORDER BY month) running_collections FROM m;

-- 10. Patient repeat-visit analysis
SELECT patient_id, COUNT(*) visit_count, MIN(admit_date) first_visit, MAX(admit_date) latest_visit
FROM encounters GROUP BY patient_id HAVING COUNT(*) > 1 ORDER BY visit_count DESC;

-- 11. Service-level classification
SELECT encounter_id, department, wait_minutes,
 CASE WHEN wait_minutes <= 20 THEN 'Within SLA' WHEN wait_minutes <= 30 THEN 'Watch' ELSE 'Breach' END wait_signal
FROM encounters ORDER BY wait_minutes DESC;

-- 12. Encounter mix
SELECT encounter_type, COUNT(*) encounters, ROUND(100.0*COUNT(*)/SUM(COUNT(*)) OVER (),1) mix_pct
FROM encounters GROUP BY encounter_type;

-- 13. Length-of-stay distribution
SELECT CASE WHEN bed_days=0 THEN 'Same day' WHEN bed_days<=3 THEN '1-3 days' WHEN bed_days<=5 THEN '4-5 days' ELSE '6+ days' END los_band,
 COUNT(*) encounters FROM encounters GROUP BY los_band;

-- 14. Data-quality checks
SELECT SUM(CASE WHEN encounter_id IS NULL THEN 1 ELSE 0 END) missing_ids,
 SUM(CASE WHEN collected_amount>billed_amount THEN 1 ELSE 0 END) over_collections,
 SUM(CASE WHEN discharge_date<admit_date THEN 1 ELSE 0 END) invalid_dates FROM encounters;

-- 15. Highest-value encounters per department
WITH ranked AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY department ORDER BY collected_amount DESC) rn FROM encounters)
SELECT department, encounter_id, collected_amount FROM ranked WHERE rn<=3 ORDER BY department,rn;
