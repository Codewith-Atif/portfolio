-- 1. Executive KPIs
SELECT COUNT(*) total_titles,SUM(CASE WHEN type='Movie' THEN 1 ELSE 0 END) movies,SUM(CASE WHEN type='TV Show' THEN 1 ELSE 0 END) tv_shows,COUNT(DISTINCT country) markets,ROUND(AVG(release_year),0) avg_release_year FROM netflix_titles;
-- 2. Catalog growth
SELECT release_year,COUNT(*) titles FROM netflix_titles GROUP BY release_year ORDER BY release_year;
-- 3. Market concentration
SELECT country,COUNT(*) titles,ROUND(100.0*COUNT(*)/(SELECT COUNT(*) FROM netflix_titles),1) catalog_share_pct FROM netflix_titles GROUP BY country ORDER BY titles DESC LIMIT 10;
-- 4. Rating mix by format
SELECT rating,type,COUNT(*) titles FROM netflix_titles GROUP BY rating,type ORDER BY titles DESC;
-- 5. Recency by country
SELECT country,ROUND(AVG(release_year),1) avg_release_year,COUNT(*) titles FROM netflix_titles GROUP BY country HAVING COUNT(*)>=20 ORDER BY avg_release_year DESC;
