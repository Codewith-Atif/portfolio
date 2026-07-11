# Tableau build guide

Connect Tableau Public/Desktop to `data/airport_operations.csv` and set `date` to Date and departure/wait/delay fields to Number.

## Calculated fields

```text
On Time Flag: IF [departure_delay_min] <= 15 THEN 1 ELSE 0 END
On Time %: AVG([On Time Flag])
Load Factor: SUM([passengers]) / SUM([seat_capacity])
Departure Hour: DATEPART('hour', DATEPARSE('HH:mm',[scheduled_departure]))
Delay Band: IF [departure_delay_min] <= 15 THEN 'On Time' ELSEIF [departure_delay_min] <= 30 THEN '16–30 min' ELSE '30+ min' END
```

Create sheets for KPI cards, passenger trend, delay cause, terminal congestion, airline benchmark and hour-terminal heatmap. Assemble them in a 1366×768 dashboard; apply date, terminal and airline filters to all worksheets. Add airline as a dashboard filter action and route as drill-down detail.

Publish to Tableau Public and place the public workbook URL in this README and your portfolio project card.
