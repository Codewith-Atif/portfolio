# GitHub Upload & Deployment Guide

## Recommended: upload with Git

1. Install Git from `https://git-scm.com/downloads` and sign in to GitHub.
2. Open Command Prompt or Git Bash in the folder where you want the portfolio.
3. Clone your repository:

```bash
git clone https://github.com/Codewith-Atif/portfolio.git
cd portfolio
```

4. Extract the ZIP and copy the complete `hospital-erp-analytics` folder into the repository root.
5. Add the Hospital ERP project card to the `Featured Projects` grid in the root `index.html`. The prepared full portfolio ZIP already includes this integration.
6. Review the changes:

```bash
git status
git diff
```

7. Create a branch, commit, and push:

```bash
git switch -c add-hospital-erp-analytics
git add index.html hospital-erp-analytics
git commit -m "Add Hospital ERP analytics project"
git push -u origin add-hospital-erp-analytics
```

8. On GitHub, open the suggested pull request, verify the files, and merge it into `main`.

## Deploy with GitHub Pages

1. Open `https://github.com/Codewith-Atif/portfolio/settings/pages`.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then Save.
4. Wait 1–5 minutes for the Pages workflow.
5. Open:
   - Portfolio: `https://codewith-atif.github.io/portfolio/`
   - Hospital ERP: `https://codewith-atif.github.io/portfolio/hospital-erp-analytics/`

## Upload through the GitHub website

For a folder with many files, Git is safer. If using the browser, open the repository, choose **Add file → Upload files**, drag the extracted project files while preserving the `hospital-erp-analytics` folder structure, and commit to a new branch. Then edit the root `index.html` separately to add the project card.

## Final recruiter checklist

- Test the live demo on phone and desktop.
- Confirm light/dark mode, department search, and CSV export.
- Download and open the Excel workbook.
- Add the live project URL to your resume.
- If you publish a Tableau Public version, add its URL to `README.md`.
