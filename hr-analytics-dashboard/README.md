# HR Analytics Dashboard

End-to-end workforce analytics portfolio project focused on employee attrition, workforce trends, department insights, performance, compensation and HR KPI reporting.

## Stack

Python · SQL · Excel · Power BI · HTML · CSS · JavaScript

## Business questions

- Which departments and job roles have the highest attrition risk?
- How do overtime, tenure, satisfaction and compensation relate to exits?
- Where are performance and engagement strongest or weakest?
- What workforce segments need retention intervention?

## Features

- Department, gender, job-level and attrition filters
- KPI cards for headcount, attrition, salary, tenure, engagement and performance
- Attrition trend and department risk comparison
- Workforce composition and job-level analysis
- Interactive sortable employee-risk table
- Automatically generated executive recommendations
- Persistent light/dark theme and filtered CSV export

## Run locally

```bash
pip install -r requirements.txt
python python/generate_data.py
python python/analyze.py
python python/create_excel.py
python -m http.server 8000
```

Open `http://localhost:8000/hr-analytics-dashboard/`.

## Dataset

The project uses 1,200 synthetic employee records. It contains no real employee or personally identifiable information.
