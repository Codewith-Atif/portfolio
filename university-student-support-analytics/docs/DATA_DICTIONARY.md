# Data dictionary

| Field | Type | Description |
|---|---|---|
| ticket_id | Text | Synthetic unique query identifier |
| student_key | Text | Randomized non-identifying student key |
| created_at | Datetime | Query creation timestamp |
| month | Text | Calendar month, YYYY-MM |
| department | Text | Academic department |
| program_level | Text | UG, PG, Diploma, or Doctoral |
| query_type | Text | Business category of the request |
| channel | Text | Contact channel |
| priority | Text | Low, Medium, High, or Critical |
| assigned_agent | Text | Anonymous support agent label |
| status | Text | Current workflow state |
| resolution_hours | Decimal | Hours to closure; blank for active tickets |
| sla_target_hours | Integer | Target based on priority |
| sla_met | Text | Yes, No, or Open |
| first_contact_resolved | Text | Whether resolved on first contact |
| reopened | Text | Whether a closed ticket was reopened |
| csat_score | Integer | Satisfaction score 1–5; blank for active tickets |
| academic_year | Text | Academic reporting year |
