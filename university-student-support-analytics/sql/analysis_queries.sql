-- 1. Executive KPI layer
SELECT COUNT(*) AS total_tickets,
 SUM(CASE WHEN status IN ('Resolved','Closed') THEN 1 ELSE 0 END) AS closed_tickets,
 ROUND(100.0*AVG(CASE WHEN sla_met='Yes' THEN 1.0 WHEN sla_met='No' THEN 0.0 END),1) AS sla_rate_pct,
 ROUND(AVG(resolution_hours),1) AS avg_resolution_hours,
 ROUND(AVG(csat_score),2) AS avg_csat
FROM student_queries;

-- 2. Monthly trend and month-over-month volume change
WITH monthly AS (SELECT month, COUNT(*) tickets FROM student_queries GROUP BY month)
SELECT month, tickets, LAG(tickets) OVER (ORDER BY month) previous_month,
 ROUND(100.0*(tickets-LAG(tickets) OVER (ORDER BY month))/NULLIF(LAG(tickets) OVER (ORDER BY month),0),1) mom_change_pct
FROM monthly ORDER BY month;

-- 3. Query categories creating the greatest service demand
SELECT query_type, COUNT(*) tickets, ROUND(AVG(resolution_hours),1) avg_resolution_hours,
 ROUND(100.0*AVG(CASE WHEN sla_met='Yes' THEN 1.0 WHEN sla_met='No' THEN 0.0 END),1) sla_rate_pct
FROM student_queries GROUP BY query_type ORDER BY tickets DESC;

-- 4. Department backlog
SELECT department, COUNT(*) open_tickets,
 SUM(CASE WHEN priority IN ('High','Critical') THEN 1 ELSE 0 END) urgent_open
FROM student_queries WHERE status NOT IN ('Resolved','Closed')
GROUP BY department ORDER BY urgent_open DESC, open_tickets DESC;

-- 5. Channel effectiveness
SELECT channel, COUNT(*) tickets,
 ROUND(100.0*AVG(CASE WHEN first_contact_resolved='Yes' THEN 1.0 ELSE 0.0 END),1) first_contact_rate_pct,
 ROUND(AVG(csat_score),2) avg_csat
FROM student_queries GROUP BY channel ORDER BY first_contact_rate_pct DESC;

-- 6. Agent performance with fair minimum-volume threshold
SELECT assigned_agent, COUNT(*) closed_tickets, ROUND(AVG(resolution_hours),1) avg_resolution_hours,
 ROUND(100.0*AVG(CASE WHEN sla_met='Yes' THEN 1.0 ELSE 0.0 END),1) sla_rate_pct,
 ROUND(AVG(csat_score),2) avg_csat
FROM student_queries WHERE status IN ('Resolved','Closed')
GROUP BY assigned_agent HAVING COUNT(*) >= 50 ORDER BY sla_rate_pct DESC, avg_csat DESC;

-- 7. Root-cause view for reopened tickets
SELECT query_type, COUNT(*) reopened_tickets, ROUND(AVG(csat_score),2) avg_csat
FROM student_queries WHERE reopened='Yes' GROUP BY query_type ORDER BY reopened_tickets DESC;

-- 8. SLA risk by priority
SELECT priority, COUNT(*) closed_tickets,
 SUM(CASE WHEN sla_met='No' THEN 1 ELSE 0 END) breaches,
 ROUND(100.0*AVG(CASE WHEN sla_met='Yes' THEN 1.0 ELSE 0.0 END),1) sla_rate_pct
FROM student_queries WHERE status IN ('Resolved','Closed') GROUP BY priority;
