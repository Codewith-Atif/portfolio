import csv, json, sqlite3, unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]

class PortfolioPipelineTests(unittest.TestCase):
    def test_outputs_exist_and_match(self):
        with (ROOT/'data/production_log.csv').open(encoding='utf-8') as f:
            rows=list(csv.DictReader(f))
        metrics=json.loads((ROOT/'data/dashboard_metrics.json').read_text(encoding='utf-8'))
        self.assertEqual(len(rows),120)
        self.assertEqual(metrics['assets'],len(rows))
        self.assertTrue(0 <= metrics['first_pass_approval'] <= 100)
        self.assertTrue(0 <= metrics['avg_quality'] <= 100)

    def test_sqlite_row_count(self):
        db=sqlite3.connect(ROOT/'data/genai_studio.db')
        count=db.execute('SELECT COUNT(*) FROM production_assets').fetchone()[0]
        db.close()
        self.assertEqual(count,120)

if __name__=='__main__': unittest.main()
