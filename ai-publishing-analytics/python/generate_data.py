"""Generate reproducible synthetic publishing-operations data."""

from __future__ import annotations

import csv
import random
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "publishing_projects.csv"
SEED = 42
ROWS = 720

DEPARTMENTS = ["Editorial", "Design", "Production", "Digital Learning"]
CONTENT_TYPES = ["School Textbook", "Workbook", "Assessment", "Illustration", "E-book"]
TEMPLATES = ["Structured v3", "Few-shot v2", "Editorial QA", "Visual Brief", "Manual / NA"]


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def generate_rows(count: int = ROWS) -> list[dict[str, object]]:
    rng = random.Random(SEED)
    rows: list[dict[str, object]] = []
    start = date(2025, 1, 1)

    for i in range(1, count + 1):
        created = start + timedelta(days=rng.randint(0, 545))
        department = rng.choices(DEPARTMENTS, weights=[33, 24, 22, 21])[0]
        content = rng.choices(CONTENT_TYPES, weights=[24, 25, 17, 18, 16])[0]
        ai_assisted = rng.random() < 0.72
        template = rng.choices(TEMPLATES[:-1], weights=[34, 23, 24, 19])[0] if ai_assisted else TEMPLATES[-1]
        pages = rng.randint(8, 220) if content in {"School Textbook", "Workbook", "E-book"} else rng.randint(4, 70)
        complexity = rng.choices(["Low", "Medium", "High"], weights=[27, 49, 24])[0]
        complexity_factor = {"Low": 0.82, "Medium": 1.0, "High": 1.32}[complexity]
        baseline_hours = pages * rng.uniform(0.36, 0.58) * complexity_factor
        efficiency = rng.uniform(0.48, 0.72) if ai_assisted else rng.uniform(0.88, 1.08)
        actual_hours = round(baseline_hours * efficiency, 1)
        hours_saved = round(max(0, baseline_hours - actual_hours), 1)
        hourly_rate = rng.uniform(650, 1150)
        actual_cost = round(actual_hours * hourly_rate, 2)
        baseline_cost = round(baseline_hours * hourly_rate, 2)

        rework_prob = 0.17 if ai_assisted else 0.27
        if complexity == "High":
            rework_prob += 0.12
        if template == "Structured v3":
            rework_prob -= 0.05
        rework = rng.random() < rework_prob
        revisions = 0 if not rework else rng.choices([1, 2, 3], weights=[60, 30, 10])[0]
        quality = clamp(rng.gauss(89 if ai_assisted else 85, 5.5) - revisions * 1.6, 65, 99)
        planned_days = max(2, round(baseline_hours / 7.5))
        due = created + timedelta(days=planned_days + rng.randint(2, 8))
        actual_days = max(1, round(actual_hours / 7.5) + revisions * rng.randint(1, 3))
        completed = created + timedelta(days=actual_days)
        status_roll = rng.random()
        status = "Completed" if status_roll < 0.87 else ("In Review" if status_roll < 0.95 else "In Progress")
        if status != "Completed":
            completed_value = ""
            on_time = ""
        else:
            completed_value = completed.isoformat()
            on_time = "Yes" if completed <= due else "No"

        rows.append({
            "project_id": f"PUB-{i:04d}",
            "created_date": created.isoformat(),
            "due_date": due.isoformat(),
            "completed_date": completed_value,
            "department": department,
            "content_type": content,
            "complexity": complexity,
            "workflow": "AI-Assisted" if ai_assisted else "Manual",
            "prompt_template": template,
            "pages": pages,
            "actual_hours": actual_hours,
            "baseline_hours": round(baseline_hours, 1),
            "hours_saved": hours_saved,
            "actual_cost_inr": actual_cost,
            "baseline_cost_inr": baseline_cost,
            "cost_saved_inr": round(max(0, baseline_cost - actual_cost), 2),
            "revisions": revisions,
            "first_pass_approved": "Yes" if revisions == 0 and status == "Completed" else ("No" if status == "Completed" else ""),
            "quality_score": round(quality, 1),
            "on_time": on_time,
            "status": status,
        })
    return rows


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    rows = generate_rows()
    with OUT.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {len(rows)} rows to {OUT}")


if __name__ == "__main__":
    main()
