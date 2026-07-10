import csv, subprocess, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def test_pipeline():
    subprocess.run([sys.executable,str(ROOT/"python/generate_data.py")],check=True)
    subprocess.run([sys.executable,str(ROOT/"python/analyze.py")],check=True)
    rows=list(csv.DictReader((ROOT/"data/student_queries.csv").open(encoding="utf-8")))
    assert len(rows)==1500
    assert len({r["ticket_id"] for r in rows})==1500
    assert all(not r["student_key"].startswith(("20","21","22")) for r in rows)
