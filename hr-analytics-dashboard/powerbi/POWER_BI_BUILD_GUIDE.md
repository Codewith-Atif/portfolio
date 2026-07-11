# Power BI build guide

Load `data/hr_employees.csv` as `Employees`, set numeric data types and create a calendar/month dimension.

```DAX
Headcount = DISTINCTCOUNT(Employees[employee_id])
Exits = CALCULATE([Headcount], Employees[attrition] = "Yes")
Attrition Rate = DIVIDE([Exits], [Headcount])
Average Income = AVERAGE(Employees[monthly_income])
Average Tenure = AVERAGE(Employees[years_at_company])
Engagement Score = AVERAGE(Employees[engagement_score])
Performance Rating = AVERAGE(Employees[performance_rating])
Overtime Headcount = CALCULATE([Headcount], Employees[overtime] = "Yes")
```

Recommended pages: Executive Overview, Attrition Drivers, Workforce Demographics and Department Drill-through. Use department, gender, job level and overtime slicers. Add conditional formatting to flag attrition above the company average.
