"""Generate a deterministic, portfolio-safe synthetic Netflix-style catalog."""
import csv, random
from pathlib import Path
random.seed(42)
OUT=Path(__file__).parents[1]/'data'/'netflix_titles.csv'
countries=['United States','India','United Kingdom','Canada','South Korea','Japan','Spain','France','Mexico','Germany','Australia','Brazil']
genres=['International Movies','Dramas','Comedies','Documentaries','Action & Adventure','Thrillers','Children & Family','Romantic Movies','Crime TV Shows','TV Dramas','Anime Series','Reality TV','Sci-Fi & Fantasy']
ratings=['TV-MA','TV-14','TV-PG','R','PG-13','TV-Y7','PG','TV-G']
words=['Hidden','Last','Midnight','Golden','Silent','Beyond','Broken','Wild','Inside','Northern','Secret','Final','Electric','Infinite','Crimson']
nouns=['City','Journey','Kingdom','Signal','Promise','River','Game','Truth','Dream','Season','Circle','Road','Code','House','Frontier']
rows=[]
for i in range(1,1201):
    typ='Movie' if random.random()<.68 else 'TV Show';year=int(random.triangular(1980,2025,2019));g=random.sample(genres,random.choice([1,1,1,2,2,3]));country=random.choices(countries,[30,20,10,7,6,6,5,5,4,3,3,3])[0]
    rows.append([f'n{i:04}',typ,f'{random.choice(words)} {random.choice(nouns)} {i}',country,year,random.choice(ratings),'|'.join(g),f'{random.randint(70,160)} min' if typ=='Movie' else f'{random.randint(1,8)} Seasons'])
OUT.parent.mkdir(parents=True,exist_ok=True)
with OUT.open('w',newline='',encoding='utf-8') as f: csv.writer(f).writerows([['show_id','type','title','country','release_year','rating','genres','duration'],*rows])
print(f'Wrote {len(rows)} rows to {OUT}')
