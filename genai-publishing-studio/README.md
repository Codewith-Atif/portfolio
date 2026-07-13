# GenAI Publishing Studio — Mohd Atif

A recruiter-facing multimodal portfolio case study for a Prompt Engineer working in print and publishing. It combines creative direction, prompt architecture, educational media workflows and production analytics.

## What recruiters can explore

- Filterable case studies for AI images, video, voice, animation and lecture videos
- A documented prompt-engineering workflow focused on consistency and print quality
- Synthetic production analytics built with Python and SQL
- Excel dashboard and Tableau-ready source data
- Responsive HTML/CSS/JavaScript experience deployable on GitHub Pages

## Run locally

```bash
python -m pip install -r requirements.txt
python python/build_portfolio_data.py
python -m http.server 8000
```

Open `http://localhost:8000` from this project folder.

## Add your real work

1. Put approved, non-confidential files in `assets/media/`.
2. Use optimized `.webp` images, `.mp4` videos and `.mp3` audio. Keep individual files below 25 MB where possible.
3. Edit the `projects` array in `assets/js/app.js` with your project title, brief, strategy and outcome.
4. For media previews, replace a card's gradient cover with an `<img>`, `<video>` or `<audio>` element.
5. Never publish employer/client assets without written approval. Remove names, ISBNs, student data and proprietary prompts.

## Technology map

| Technology | Real purpose in this project |
|---|---|
| HTML/CSS/JavaScript | Responsive case-study site, filters, modal and dynamic metrics |
| Python | Reproducible synthetic dataset, KPI layer, SQLite and Excel generation |
| SQL | Schema and portfolio-grade operational analysis |
| Excel | Production log, summary dashboard and chart |
| Tableau | Public-dashboard workflow using the included CSV |

## GitHub Pages URL

After adding this folder to your `portfolio` repository, the live URL will be:

`https://codewith-atif.github.io/portfolio/genai-publishing-studio/`

All demo data is synthetic. Replace the placeholder email in `index.html` before publishing.
