"""Generate privacy-safe synthetic university student support records."""
from __future__ import annotations

import csv, json, random
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
SEED = 20260710
N = 1500

DEPARTMENTS = ["Engineering", "Management", "Computer Applications", "Commerce", "Science", "Humanities"]
QUERY_TYPES = ["Fee & Payment", "Examination", "Enrollment", "Scholarship", "Document Update", "Results", "Portal Access", "Timetable"]
CHANNELS = ["Service Desk", "Email", "Phone", "Walk-in", "Student Portal"]
PRIORITIES = ["Low", "Medium", "High", "Critical"]
AGENTS = ["Agent A", "Agent B", "Agent C", "Agent D", "Agent E", "Agent F"]

def generate():
    rng = random.Random(SEED)
    start = datetime(2025, 1, 1, 8)
    rows = []
    for i in range(1, N + 1):
        created = start + timedelta(days=rng.randrange(0, 540), hours=rng.randrange(0, 10), minutes=rng.randrange(0, 60))
        query_type = rng.choices(QUERY_TYPES, [18, 15, 13, 10, 11, 12, 13, 8])[0]
        priority = rng.choices(PRIORITIES, [16, 55, 24, 5])[0]
        base_hours = {"Low": 34, "Medium": 22, "High": 11, "Critical": 5}[priority]
        resolution_hours = max(0.5, rng.lognormvariate(2.2, .7) + rng.uniform(0, base_hours))
        sla_target = {"Low": 72, "Medium": 48, "High": 24, "Critical": 8}[priority]
        status = rng.choices(["Resolved", "Closed", "In Progress", "Pending Student"], [56, 27, 10, 7])[0]
        closed = status in {"Resolved", "Closed"}
        first_contact = rng.random() < (0.74 if query_type in {"Portal Access", "Timetable"} else 0.61)
        reopened = closed and rng.random() < (0.07 if first_contact else 0.17)
        csat = rng.choices([1,2,3,4,5], [2,4,12,38,44] if closed else [6,12,25,36,21])[0]
        student_key = f"STU-{rng.randrange(10000, 99999)}"
        rows.append({
            "ticket_id": f"QRY-{i:05d}", "student_key": student_key,
            "created_at": created.strftime("%Y-%m-%d %H:%M"), "month": created.strftime("%Y-%m"),
            "department": rng.choice(DEPARTMENTS), "program_level": rng.choices(["UG", "PG", "Diploma", "Doctoral"], [62,25,9,4])[0],
            "query_type": query_type, "channel": rng.choices(CHANNELS, [28,22,18,12,20])[0], "priority": priority,
            "assigned_agent": rng.choice(AGENTS), "status": status,
            "resolution_hours": round(resolution_hours, 1) if closed else "", "sla_target_hours": sla_target,
            "sla_met": "Yes" if closed and resolution_hours <= sla_target else ("No" if closed else "Open"),
            "first_contact_resolved": "Yes" if closed and first_contact else "No",
            "reopened": "Yes" if reopened else "No", "csat_score": csat if closed else "",
            "academic_year": "2025-26" if created.month >= 7 else "2024-25",
        })
    return rows

def summarize(rows):
    closed = [r for r in rows if r["status"] in {"Resolved", "Closed"}]
    by_month = defaultdict(lambda: {"tickets":0,"closed":0,"sla_met":0,"resolution_total":0.0,"csat_total":0})
    for r in rows:
        m=by_month[r["month"]]; m["tickets"] += 1
        if r in closed:
            m["closed"] += 1; m["sla_met"] += r["sla_met"] == "Yes"; m["resolution_total"] += float(r["resolution_hours"]); m["csat_total"] += int(r["csat_score"])
    monthly=[]
    for month, m in sorted(by_month.items()):
        monthly.append({"month":month,"tickets":m["tickets"],"closed":m["closed"],"sla_rate":round(m["sla_met"]/m["closed"]*100,1),"avg_resolution_hours":round(m["resolution_total"]/m["closed"],1),"avg_csat":round(m["csat_total"]/m["closed"],2)})
    metrics={"tickets":len(rows),"closed":len(closed),"open":len(rows)-len(closed),"sla_rate":round(sum(r["sla_met"]=="Yes" for r in closed)/len(closed)*100,1),"first_contact_rate":round(sum(r["first_contact_resolved"]=="Yes" for r in closed)/len(closed)*100,1),"avg_resolution_hours":round(sum(float(r["resolution_hours"]) for r in closed)/len(closed),1),"avg_csat":round(sum(int(r["csat_score"]) for r in closed)/len(closed),2),"reopen_rate":round(sum(r["reopened"]=="Yes" for r in closed)/len(closed)*100,1)}
    return monthly, metrics

def main():
    DATA.mkdir(exist_ok=True)
    rows=generate(); monthly,metrics=summarize(rows)
    with (DATA/"student_queries.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.DictWriter(f,fieldnames=rows[0].keys()); w.writeheader(); w.writerows(rows)
    with (DATA/"monthly_summary.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.DictWriter(f,fieldnames=monthly[0].keys()); w.writeheader(); w.writerows(monthly)
    (DATA/"dashboard_metrics.json").write_text(json.dumps(metrics,indent=2),encoding="utf-8")
    print(json.dumps(metrics,indent=2))

if __name__ == "__main__": main()
