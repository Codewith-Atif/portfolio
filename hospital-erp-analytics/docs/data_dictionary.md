# Data Dictionary

| Field | Type | Meaning |
|---|---|---|
| encounter_id | Text | Unique synthetic encounter key |
| patient_id | Text | De-identified synthetic patient key |
| admit_date / discharge_date | Date | Encounter start and end dates |
| department | Category | Operational department |
| encounter_type | Category | Inpatient, Outpatient, or Emergency |
| appointment_status | Category | Scheduled, Completed, Cancelled, or No-show |
| wait_minutes | Integer | Registration-to-service waiting time in minutes |
| bed_days | Integer | Administrative length of stay in days; zero for same-day care |
| billed_amount | Decimal | Gross amount billed in INR |
| collected_amount | Decimal | Amount collected in INR |
| readmitted_30d | Boolean | Synthetic indicator for return within 30 days |

All data is synthetic. Metrics are designed for administrative portfolio analysis, not clinical use.
