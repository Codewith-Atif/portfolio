-- SQLite-compatible airport analytics model and recruiter-ready queries
CREATE TABLE IF NOT EXISTS flights (
  flight_date DATE, flight_id TEXT PRIMARY KEY, airline TEXT, route TEXT,
  terminal TEXT, scheduled_departure TIME, seat_capacity INTEGER, passengers INTEGER,
  departure_delay_min REAL, delay_cause TEXT, security_wait_min REAL,
  baggage_delivery_min REAL, satisfaction_score REAL
);

CREATE VIEW IF NOT EXISTS vw_flight_kpis AS
SELECT *, CASE WHEN departure_delay_min <= 15 THEN 1 ELSE 0 END AS on_time_flag,
       ROUND(1.0 * passengers / NULLIF(seat_capacity,0),4) AS load_factor
FROM flights;

-- Executive KPIs
SELECT COUNT(*) flights, SUM(passengers) passengers,
 ROUND(100.0*AVG(on_time_flag),1) on_time_pct,
 ROUND(AVG(departure_delay_min),1) avg_delay_min,
 ROUND(100.0*AVG(load_factor),1) load_factor_pct,
 ROUND(AVG(security_wait_min),1) avg_security_wait_min
FROM vw_flight_kpis;

-- Airline benchmark with ranking
WITH airline AS (
 SELECT airline, COUNT(*) flights, SUM(passengers) passengers,
        100.0*AVG(on_time_flag) otp, AVG(departure_delay_min) avg_delay,
        100.0*AVG(load_factor) load_factor
 FROM vw_flight_kpis GROUP BY airline
)
SELECT *, DENSE_RANK() OVER(ORDER BY otp DESC, avg_delay ASC) performance_rank
FROM airline ORDER BY performance_rank;

-- Peak-hour demand for staffing decisions
SELECT SUBSTR(scheduled_departure,1,2) departure_hour, terminal,
       COUNT(*) flights, SUM(passengers) passengers,
       ROUND(AVG(security_wait_min),1) avg_security_wait
FROM flights GROUP BY departure_hour,terminal ORDER BY departure_hour,terminal;

-- Delay root cause excluding on-time flights
SELECT delay_cause, COUNT(*) delayed_flights,
 ROUND(100.0*COUNT(*)/SUM(COUNT(*)) OVER(),1) contribution_pct,
 ROUND(AVG(departure_delay_min),1) avg_delay_min
FROM flights WHERE departure_delay_min>15
GROUP BY delay_cause ORDER BY delayed_flights DESC;

-- Seven-day rolling passenger demand
WITH daily AS (SELECT flight_date,SUM(passengers) passengers FROM flights GROUP BY flight_date)
SELECT flight_date,passengers,
 ROUND(AVG(passengers) OVER(ORDER BY flight_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW),1) rolling_7d_passengers
FROM daily ORDER BY flight_date;
