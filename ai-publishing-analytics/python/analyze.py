"""Clean the project dataset and produce dashboard-ready aggregates."""

from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "publishing_projects.csv"


def load_data(path: Path = DATA) -> pd.DataFrame:
    df = pd.read_csv(path)
    for col in ["created_date", "due_date", "completed_date"]:
        df[col] = pd.to_datetime(df[col], errors="coerce")
    numeric = ["pages", "actual_hours", "baseline_hours", "hours_saved", "actual_cost_inr", "baseline_cost_inr", "cost_saved_inr", "revisions", "quality_score"]
    df[numeric] = df[numeric].apply(pd.to_numeric, errors="coerce")
    if df["project_id"].duplicated().any():
        raise ValueError("Duplicate project IDs found")
    if not df["quality_score"].between(0, 100).all():
        raise ValueError("Quality score outside 0–100")
    return df


def calculate_metrics(df: pd.DataFrame) -> dict[str, float | int]:
    completed = df[df["status"] == "Completed"]
    return {
        "projects": int(len(df)),
        "completed_projects": int(len(completed)),
        "on_time_rate": round((completed["on_time"] == "Yes").mean() * 100, 1),
        "first_pass_rate": round((completed["first_pass_approved"] == "Yes").mean() * 100, 1),
        "avg_quality": round(df["quality_score"].mean(), 1),
        "hours_saved": round(df["hours_saved"].sum(), 1),
        "cost_saved_inr": round(df["cost_saved_inr"].sum(), 2),
    }


def main() -> None:
    df = load_data()
    metrics = calculate_metrics(df)
    monthly = (
        df.assign(month=df["created_date"].dt.to_period("M").astype(str))
        .groupby("month", as_index=False)
        .agg(projects=("project_id", "count"), avg_quality=("quality_score", "mean"), hours_saved=("hours_saved", "sum"), cost_saved_inr=("cost_saved_inr", "sum"))
        .round(1)
    )
    monthly.to_csv(ROOT / "data" / "monthly_summary.csv", index=False)
    (ROOT / "data" / "dashboard_metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(json.dumps(metrics, indent=2))


if __name__ == "__main__":
    main()
