# Tableau Dashboard Build Guide

Connect Tableau Public to `data/textile_production_data.csv`.

## Calculated fields

```text
Production Efficiency = SUM([Actual Meters]) / SUM([Target Meters])
Defect Rate = SUM([Defect Meters]) / SUM([Actual Meters])
Waste Rate = SUM([Waste Kg]) / SUM([Material Issued Kg])
FPY = SUM([Good Meters]) / SUM([Actual Meters])
On-Time Delivery = AVG(IIF([Delivery Status] = 'On Time', 1, 0))
Energy Intensity = SUM([Energy Kwh]) / SUM([Actual Meters])
```

Format the first five fields as percentages.

## Recommended sheets

1. KPI cards: Actual Meters, Efficiency, Defect Rate, Waste Rate, On-Time Delivery.
2. Monthly trend: Month on Columns; Actual and Target Meters on Rows; dual line chart.
3. Plant output: Plant and Actual Meters; horizontal bar chart.
4. Defect Pareto: Defect Type and Defect Meters; descending bars plus cumulative percentage.
5. Line performance: Production Line vs Efficiency; colour by Downtime Minutes.
6. Shift quality: Shift vs Defect Rate and Waste Rate.

Add Plant, Fabric Type, Shift and Month as dashboard filters and apply them to all worksheets.

