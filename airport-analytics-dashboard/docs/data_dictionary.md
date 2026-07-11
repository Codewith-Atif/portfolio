# Data dictionary

| Field | Type | Description |
|---|---|---|
| date | Date | Scheduled flight date |
| flight_id | Text | Unique synthetic flight identifier |
| airline | Text | Operating airline |
| route | Text | Origin-destination airport code pair |
| terminal | Text | Departure terminal |
| scheduled_departure | Time | Scheduled local departure time |
| seat_capacity | Integer | Available aircraft seats |
| passengers | Integer | Booked/travelling passengers |
| departure_delay_min | Decimal | Departure delay in minutes |
| delay_cause | Text | Primary cause; None for on-time flights |
| security_wait_min | Decimal | Average security queue time |
| baggage_delivery_min | Decimal | Arrival-to-first-bag time |
| satisfaction_score | Decimal | Synthetic passenger rating from 1 to 5 |

Calculated fields: `on_time_flag = departure_delay_min <= 15`; `load_factor = passengers / seat_capacity`.
