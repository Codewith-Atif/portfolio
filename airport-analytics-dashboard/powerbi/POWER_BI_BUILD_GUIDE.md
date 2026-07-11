# Power BI build guide

1. Open Power BI Desktop → Get Data → Text/CSV → `data/airport_operations.csv`.
2. Rename the query `Flights`, set data types, create a calendar table, and relate `Calendar[Date]` 1:* to `Flights[date]`.
3. Add slicers for Calendar date, terminal and airline.

## DAX measures

```DAX
Total Flights = COUNTROWS(Flights)
Total Passengers = SUM(Flights[passengers])
On-Time Flights = CALCULATE([Total Flights], Flights[departure_delay_min] <= 15)
On-Time % = DIVIDE([On-Time Flights], [Total Flights])
Average Delay = AVERAGE(Flights[departure_delay_min])
Load Factor % = DIVIDE(SUM(Flights[passengers]), SUM(Flights[seat_capacity]))
Avg Security Wait = AVERAGE(Flights[security_wait_min])
Avg Baggage Delivery = AVERAGE(Flights[baggage_delivery_min])
Previous Day Passengers = CALCULATE([Total Passengers], DATEADD('Calendar'[Date], -1, DAY))
Passenger Change % = DIVIDE([Total Passengers]-[Previous Day Passengers],[Previous Day Passengers])
```

## Recommended pages

- Executive Overview: KPI cards, daily passengers, delay causes, airline matrix.
- Passenger Flow: hour/terminal heatmap, security wait, load factor and satisfaction.
- Operations: on-time trend, route benchmark and baggage performance.
- Drill-through: airline detail with route and date context.

Use conditional formatting: green ≥85% OTP, amber 75–85%, red <75%.
