DROP TABLE IF EXISTS student_queries;
CREATE TABLE student_queries (
  ticket_id VARCHAR(12) PRIMARY KEY,
  student_key VARCHAR(12) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  month CHAR(7) NOT NULL,
  department VARCHAR(50) NOT NULL,
  program_level VARCHAR(12) NOT NULL,
  query_type VARCHAR(40) NOT NULL,
  channel VARCHAR(30) NOT NULL,
  priority VARCHAR(10) NOT NULL,
  assigned_agent VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  resolution_hours DECIMAL(8,1),
  sla_target_hours INT NOT NULL,
  sla_met VARCHAR(4) NOT NULL,
  first_contact_resolved VARCHAR(3) NOT NULL,
  reopened VARCHAR(3) NOT NULL,
  csat_score INT,
  academic_year VARCHAR(7) NOT NULL,
  CHECK (priority IN ('Low','Medium','High','Critical')),
  CHECK (csat_score IS NULL OR csat_score BETWEEN 1 AND 5)
);
CREATE INDEX idx_query_month ON student_queries(month);
CREATE INDEX idx_query_type ON student_queries(query_type);
CREATE INDEX idx_query_department ON student_queries(department);
