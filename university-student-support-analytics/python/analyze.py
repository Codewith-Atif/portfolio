"""Run data-quality checks and create a concise analysis report."""
import csv, json
from collections import Counter, defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]; DATA=ROOT/"data"
def main():
    rows=list(csv.DictReader((DATA/"student_queries.csv").open(encoding="utf-8")))
    assert len({r["ticket_id"] for r in rows}) == len(rows)
    assert all(r["priority"] in {"Low","Medium","High","Critical"} for r in rows)
    closed=[r for r in rows if r["status"] in {"Resolved","Closed"}]
    by_type=defaultdict(list)
    for r in closed: by_type[r["query_type"]].append(r)
    ranking=[]
    for name, group in by_type.items():
        ranking.append({"query_type":name,"tickets":len(group),"sla_rate":round(sum(r["sla_met"]=="Yes" for r in group)/len(group)*100,1),"avg_resolution_hours":round(sum(float(r["resolution_hours"]) for r in group)/len(group),1),"avg_csat":round(sum(int(r["csat_score"]) for r in group)/len(group),2)})
    ranking.sort(key=lambda x:x["tickets"],reverse=True)
    (DATA/"query_type_summary.json").write_text(json.dumps(ranking,indent=2),encoding="utf-8")
    print(f"Validated {len(rows)} records; {len(closed)} closed tickets; {len(rows)-len(closed)} active tickets.")
if __name__=="__main__": main()
