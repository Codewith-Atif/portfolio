# GitHub upload and deployment

## Recommended: GitHub web upload

1. Download and extract the project ZIP.
2. Open `https://github.com/Codewith-Atif/portfolio` and sign in.
3. Choose **Add file → Upload files**.
4. Drag the complete `netflix-analytics-dashboard` folder into the uploader. Confirm the folder name stays exactly the same.
5. Commit with: `Add Netflix analytics dashboard project`.
6. Edit the repository's root `index.html`. In the Netflix project card, replace the Coming Soon links with:

```html
<a href="./netflix-analytics-dashboard/index.html" target="_blank" class="btn primary">Live Demo</a>
<a href="https://github.com/Codewith-Atif/portfolio/tree/main/netflix-analytics-dashboard" target="_blank" class="btn"><i class="fab fa-github"></i> Code</a>
```

7. Commit with: `Link Netflix dashboard from portfolio`.
8. Open **Settings → Pages**. Under Build and deployment, select **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
9. Wait for the Pages workflow to complete and test:
   - Portfolio: `https://codewith-atif.github.io/portfolio/`
   - Dashboard: `https://codewith-atif.github.io/portfolio/netflix-analytics-dashboard/`

## Git command option

```bash
git clone https://github.com/Codewith-Atif/portfolio.git
cd portfolio
# Copy netflix-analytics-dashboard into this directory
git add netflix-analytics-dashboard index.html
git commit -m "Add Netflix analytics dashboard"
git push origin main
```

## Final recruiter checks

- Test the dashboard on mobile and desktop.
- Confirm every chart updates when filters change.
- Confirm both light and dark modes are readable.
- Add the live dashboard URL to LinkedIn Featured and your resume.
- Optional: publish the Tableau version and add its URL to the project README.
