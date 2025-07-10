@echo off
echo 🚀 Deploying to GitHub Pages...

REM Optional: If you use a build step, add it here (e.g., npm run build)

git add .
git commit -m "🚀 Update site on %date% %time%"
git push origin main

echo ✅ Deployment complete!
echo Your site should update shortly: https://subratapatidev.github.io/

pause
