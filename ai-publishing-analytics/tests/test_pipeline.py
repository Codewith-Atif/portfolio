from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "python"))

from analyze import calculate_metrics, load_data
from generate_data import generate_rows


def test_generator_is_reproducible():
    assert generate_rows(5) == generate_rows(5)


def test_project_ids_are_unique():
    rows = generate_rows(100)
    assert len({row["project_id"] for row in rows}) == 100


def test_metric_ranges():
    df = load_data()
    metrics = calculate_metrics(df)
    assert metrics["projects"] > 0
    assert 0 <= metrics["on_time_rate"] <= 100
    assert 0 <= metrics["first_pass_rate"] <= 100
    assert 0 <= metrics["avg_quality"] <= 100
    assert metrics["hours_saved"] >= 0
    assert metrics["cost_saved_inr"] >= 0
