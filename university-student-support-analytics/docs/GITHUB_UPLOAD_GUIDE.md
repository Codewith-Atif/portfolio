# GitHub upload and deployment guide

## Recommended: Git command line

```bash
git clone https://github.com/Codewith-Atif/portfolio.git
cd portfolio
# Copy the university-student-support-analytics folder here and update index.html
git checkout -b feature/university-support-analytics
git add university-student-support-analytics index.html
git commit -m "Add university student support analytics project"
git push -u origin feature/university-support-analytics
```

Open the repository on GitHub, create a pull request into `main`, review the files, and merge it. GitHub Pages will update automatically if it is configured to deploy from `main` and the repository root.

## Verify GitHub Pages

1. Repository → **Settings** → **Pages**.
2. Under *Build and deployment*, select **Deploy from a branch**.
3. Choose branch `main`, folder `/(root)`, then **Save**.
4. Visit `https://codewith-atif.github.io/portfolio/university-student-support-analytics/`.

## GitHub website upload alternative

Open the repository → **Add file** → **Upload files**. Drag the complete `university-student-support-analytics` folder contents while preserving the folder structure, then commit. Update the root `index.html` separately. Command line or GitHub Desktop is safer for a multi-folder project.
