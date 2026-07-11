"""Reproducible catalog profiling with standard-library Python."""
import csv, collections, statistics
from pathlib import Path
DATA=Path(__file__).parents[1]/'data'/'netflix_titles.csv'
with DATA.open(encoding='utf-8') as f: rows=list(csv.DictReader(f))
types=collections.Counter(r['type'] for r in rows); countries=collections.Counter(r['country'] for r in rows); genres=collections.Counter(g for r in rows for g in r['genres'].split('|'))
print('CATALOG PROFILE');print('-'*40);print('Titles:',len(rows));print('Movies:',types['Movie']);print('TV Shows:',types['TV Show']);print('Median release year:',int(statistics.median(int(r['release_year']) for r in rows)));print('Top countries:',countries.most_common(5));print('Top genres:',genres.most_common(5))
