-- 1. Executive KPI summary
SELECT ROUND(SUM(actual_meters),0) production_meters,
 ROUND(100*SUM(actual_meters)/SUM(target_meters),2) efficiency_pct,
 ROUND(100*SUM(defect_meters)/SUM(actual_meters),2) defect_rate_pct,
 ROUND(100*SUM(waste_kg)/SUM(material_issued_kg),2) waste_rate_pct,
 ROUND(SUM(order_value_inr),0) order_value_inr
FROM production_runs;

-- 2. Monthly target attainment
SELECT month, SUM(target_meters) target_meters, SUM(actual_meters) actual_meters,
 ROUND(100*SUM(actual_meters)/SUM(target_meters),2) efficiency_pct
FROM production_runs GROUP BY month ORDER BY MIN(production_date);

-- 3. Plant ranking using a window function
WITH plant_kpi AS (
 SELECT plant, SUM(actual_meters) output_meters,
  100*SUM(good_meters)/SUM(actual_meters) fpq_yield
 FROM production_runs GROUP BY plant
)
SELECT *, DENSE_RANK() OVER(ORDER BY output_meters DESC) output_rank
FROM plant_kpi;

-- 4. Production-line performance
SELECT plant, production_line, ROUND(100*SUM(actual_meters)/SUM(target_meters),2) efficiency_pct,
 ROUND(AVG(downtime_minutes),1) avg_downtime_minutes
FROM production_runs GROUP BY plant, production_line ORDER BY efficiency_pct DESC;

-- 5. Defect Pareto
SELECT defect_type, ROUND(SUM(defect_meters),0) defective_meters,
 ROUND(100*SUM(defect_meters)/SUM(SUM(defect_meters)) OVER(),2) contribution_pct
FROM production_runs GROUP BY defect_type ORDER BY defective_meters DESC;

-- 6. Shift quality comparison
SELECT shift, ROUND(100*SUM(defect_meters)/SUM(actual_meters),2) defect_rate_pct,
 ROUND(100*SUM(waste_kg)/SUM(material_issued_kg),2) waste_rate_pct
FROM production_runs GROUP BY shift;

-- 7. Delivery reliability by customer segment
SELECT customer_segment, COUNT(*) orders,
 ROUND(100*AVG(CASE WHEN delivery_status='On Time' THEN 1 ELSE 0 END),2) on_time_pct
FROM production_runs GROUP BY customer_segment;

-- 8. Bottom-quartile runs requiring investigation
WITH scored AS (
 SELECT *, 100*actual_meters/target_meters efficiency_pct,
  NTILE(4) OVER(ORDER BY actual_meters/target_meters) efficiency_quartile
 FROM production_runs
)
SELECT run_id, production_date, plant, production_line, efficiency_pct, downtime_minutes
FROM scored WHERE efficiency_quartile=1 ORDER BY efficiency_pct;

-- 9. Seven-day rolling production
WITH daily AS (
 SELECT production_date, SUM(actual_meters) output_meters
 FROM production_runs GROUP BY production_date
)
SELECT production_date, output_meters,
 ROUND(AVG(output_meters) OVER(ORDER BY production_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW),0) rolling_7d_avg
FROM daily;

-- 10. Fabric profitability proxy
SELECT fabric_type, ROUND(SUM(order_value_inr),0) order_value,
 ROUND(SUM(order_value_inr)/SUM(actual_meters),2) value_per_meter,
 ROUND(100*SUM(waste_kg)/SUM(material_issued_kg),2) waste_pct
FROM production_runs GROUP BY fabric_type ORDER BY order_value DESC;

-- 11. Energy intensity
SELECT plant, ROUND(SUM(energy_kwh)/SUM(actual_meters),4) kwh_per_meter
FROM production_runs GROUP BY plant ORDER BY kwh_per_meter;

-- 12. Risk flag for late delivery
SELECT run_id, plant, production_line, delivery_status,
 ROUND(100*actual_meters/target_meters,2) efficiency_pct, downtime_minutes,
 CASE WHEN actual_meters/target_meters<0.88 OR downtime_minutes>70 THEN 'High Risk' ELSE 'Normal' END risk_flag
FROM production_runs WHERE delivery_status='Late';

