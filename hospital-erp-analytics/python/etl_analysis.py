"""Hospital ERP ETL and KPI pipeline using synthetic portfolio data."""
from pathlib import Path
import sqlite3
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "hospital_encounters.csv"
OUTPUT = ROOT / "outputs"

def load_and_validate(path: Path) -> pd.DataFrame:
    df = pd.read_csv(path, parse_dates=["admit_date", "discharge_date"])
    required = {"encounter_id", "patient_id", "department", "wait_minutes", "billed_amount", "collected_amount"}
    missing = required.difference(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {sorted(missing)}")
    if df["encounter_id"].duplicated().any():
        raise ValueError("Duplicate encounter IDs detected")
    if (df[["wait_minutes", "bed_days", "billed_amount", "collected_amount"]] < 0).any().any():
        raise ValueError("Negative operational values detected")
    df["month"] = df["admit_date"].dt.to_period("M").astype(str)
    df["collection_rate"] = df["collected_amount"].div(df["billed_amount"].replace(0, pd.NA))
    return df

def create_outputs(df: pd.DataFrame) -> None:
    OUTPUT.mkdir(exist_ok=True)
    summary = (df.groupby("department", as_index=False)
        .agg(patients=("patient_id", "nunique"), encounters=("encounter_id", "count"),
             avg_wait_minutes=("wait_minutes", "mean"), avg_los_days=("bed_days", "mean"),
             billed_amount=("billed_amount", "sum"), collected_amount=("collected_amount", "sum"),
             readmission_rate=("readmitted_30d", "mean")))
    summary["collection_rate"] = summary["collected_amount"] / summary["billed_amount"]
    summary.to_csv(OUTPUT / "tableau_department_summary.csv", index=False)
    df.to_csv(OUTPUT / "tableau_encounter_extract.csv", index=False)
    with sqlite3.connect(OUTPUT / "hospital_erp.db") as con:
        df.to_sql("encounters", con, if_exists="replace", index=False)
    print(summary.round(3).to_string(index=False))
    print(f"\nValidation passed: {len(df)} encounters; outputs saved to {OUTPUT}")

if __name__ == "__main__":
    create_outputs(load_and_validate(SOURCE))
