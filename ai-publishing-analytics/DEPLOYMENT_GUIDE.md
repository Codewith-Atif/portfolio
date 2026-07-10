# GitHub Upload & Deployment Guide

This guide uses the folder name `ai-publishing-analytics` and your existing repository `Codewith-Atif/portfolio`.

## Option A — easiest: GitHub website

1. Download and unzip the project.
2. Open [your portfolio repository](https://github.com/Codewith-Atif/portfolio).
3. Click **Add file → Upload files**.
4. Drag the complete `ai-publishing-analytics` folder into the upload area. Do not upload only its inner files.
5. Add commit message: `Add AI Publishing Operations Analytics project`.
6. Click **Commit changes**.
7. Wait 1–3 minutes, then open:
   `https://codewith-atif.github.io/portfolio/ai-publishing-analytics/`

## Option B — recommended: Git commands

```bash
git clone https://github.com/Codewith-Atif/portfolio.git
cd portfolio
# Copy the ai-publishing-analytics folder into this directory
git add ai-publishing-analytics
git commit -m "Add AI Publishing Operations Analytics project"
git push origin main
```

## Add it to your portfolio home page

Open the root `index.html` in your portfolio repo and add a project card inside the existing project grid. Adapt class names to match your current cards:

```html
<article class="project-card">
  <h3>AI Publishing Operations Analytics</h3>
  <p>End-to-end analysis of AI-assisted editorial throughput, quality, rework, turnaround time, and cost savings.</p>
  <div class="project-tags">
    <span>Python</span><span>SQL</span><span>Excel</span>
    <span>Tableau</span><span>JavaScript</span>
  </div>
  <a href="./ai-publishing-analytics/">Live Dashboard</a>
  <a href="https://github.com/Codewith-Atif/portfolio/tree/main/ai-publishing-analytics">Source Code</a>
</article>
```

## Confirm GitHub Pages settings

1. Repository → **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch **main** and folder **/(root)**.
4. Click **Save**.

Your existing portfolio URL already indicates Pages is configured, so normally no change is needed.

## Tableau publishing

GitHub Pages cannot render a `.twb` file directly. Use `tableau/TABLEAU_GUIDE.md` to build the dashboard in Tableau Public, publish it, then paste the Tableau Public link into this web dashboard and your portfolio card.

## Before sharing with recruiters

- Verify the live dashboard on desktop and phone.
- Replace the LinkedIn URL in `index.html` if needed.
- Pin the portfolio repository on your GitHub profile.
- Add the project link to your résumé under Projects.
- Keep the synthetic-data disclosure in the README.
