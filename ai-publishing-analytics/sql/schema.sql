DROP TABLE IF EXISTS publishing_projects;

CREATE TABLE publishing_projects (
    project_id VARCHAR(12) PRIMARY KEY,
    created_date DATE NOT NULL,
    due_date DATE NOT NULL,
    completed_date DATE,
    department VARCHAR(40) NOT NULL,
    content_type VARCHAR(40) NOT NULL,
    complexity VARCHAR(10) NOT NULL CHECK (complexity IN ('Low','Medium','High')),
    workflow VARCHAR(20) NOT NULL CHECK (workflow IN ('AI-Assisted','Manual')),
    prompt_template VARCHAR(40) NOT NULL,
    pages INTEGER NOT NULL CHECK (pages > 0),
    actual_hours DECIMAL(10,1) NOT NULL,
    baseline_hours DECIMAL(10,1) NOT NULL,
    hours_saved DECIMAL(10,1) NOT NULL,
    actual_cost_inr DECIMAL(12,2) NOT NULL,
    baseline_cost_inr DECIMAL(12,2) NOT NULL,
    cost_saved_inr DECIMAL(12,2) NOT NULL,
    revisions INTEGER NOT NULL,
    first_pass_approved VARCHAR(3),
    quality_score DECIMAL(5,1) NOT NULL CHECK (quality_score BETWEEN 0 AND 100),
    on_time VARCHAR(3),
    status VARCHAR(20) NOT NULL
);

CREATE INDEX idx_projects_created ON publishing_projects(created_date);
CREATE INDEX idx_projects_department ON publishing_projects(department);
CREATE INDEX idx_projects_workflow ON publishing_projects(workflow);
