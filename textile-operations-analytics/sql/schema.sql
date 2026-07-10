CREATE DATABASE IF NOT EXISTS textile_analytics;
USE textile_analytics;

CREATE TABLE production_runs (
  run_id VARCHAR(12) PRIMARY KEY,
  production_date DATE NOT NULL,
  month CHAR(3) NOT NULL,
  plant VARCHAR(30) NOT NULL,
  production_line VARCHAR(10) NOT NULL,
  shift VARCHAR(10) NOT NULL,
  fabric_type VARCHAR(30) NOT NULL,
  customer_segment VARCHAR(30) NOT NULL,
  target_meters DECIMAL(12,2) NOT NULL,
  actual_meters DECIMAL(12,2) NOT NULL,
  good_meters DECIMAL(12,2) NOT NULL,
  defect_meters DECIMAL(12,2) NOT NULL,
  defect_type VARCHAR(30) NOT NULL,
  material_issued_kg DECIMAL(12,2) NOT NULL,
  waste_kg DECIMAL(12,2) NOT NULL,
  downtime_minutes INT NOT NULL,
  machine_speed_rpm INT NOT NULL,
  operators_count INT NOT NULL,
  energy_kwh DECIMAL(12,2) NOT NULL,
  order_value_inr DECIMAL(14,2) NOT NULL,
  delivery_status VARCHAR(15) NOT NULL,
  quality_grade CHAR(1) NOT NULL
);

CREATE INDEX idx_production_date ON production_runs(production_date);
CREATE INDEX idx_plant_line ON production_runs(plant, production_line);
CREATE INDEX idx_fabric ON production_runs(fabric_type);

