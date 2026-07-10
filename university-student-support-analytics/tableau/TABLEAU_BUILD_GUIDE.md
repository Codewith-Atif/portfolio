# Tableau dashboard build guide

## Connect

1. Open Tableau Public/Desktop and connect to `data/student_queries.csv`.
2. Rename the data source **University Student Support**.
3. Set `created_at` to Date & Time, `resolution_hours` to Number (decimal), `csat_score` to Number (whole), and `ticket_id` to String.

## Calculated fields

```tableau
// Closed Ticket
IF [Status] = "Resolved" OR [Status] = "Closed" THEN 1 ELSE 0 END

// SLA Met Flag
IF [Sla Met] = "Yes" THEN 1 ELSEIF [Sla Met] = "No" THEN 0 END

// SLA Compliance
SUM([SLA Met Flag]) / SUM([Closed Ticket])

// First Contact Flag
IF [First Contact Resolved] = "Yes" THEN 1 ELSE 0 END

// First Contact Resolution
SUM([First Contact Flag]) / SUM([Closed Ticket])

// Open Ticket
IF [Status] <> "Resolved" AND [Status] <> "Closed" THEN 1 ELSE 0 END
```

## Recommended worksheets

1. KPI cards: total queries, SLA compliance, average resolution hours, FCR, average CSAT.
2. Monthly trend: `MONTH(created_at)` on Columns and count of `ticket_id` on Rows.
3. Query demand: query type vs count of tickets, sorted descending.
4. Department backlog: department vs sum of Open Ticket; color by priority.
5. Channel effectiveness: channel, FCR, CSAT, and volume.
6. Detail table: query type, tickets, resolution hours, SLA, CSAT, reopen rate.

## Dashboard

Use a 1,360 × 900 fixed canvas. Add global filters for department, query type, channel, priority, program level, and created date. Use dark navy `#081A2D`, teal `#176B87`, cyan `#36C2CE`, and light background `#F5F8FA`. Add a visible note: **Synthetic portfolio data — no real student records**.

Publish to Tableau Public and replace the project page's code link with your Tableau view URL if desired.
