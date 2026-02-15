#!/bin/bash

echo "🔍 Shoppify Health Kart - Deployment Status Check"
echo "================================================"
echo ""

echo "📁 Project Status:"
echo "Directory: $(pwd)"
echo ""

echo "📦 Build Status:"
if [ -d "dist" ]; then
    echo "✅ Build directory exists: dist/"
    echo "   Files: $(ls -1 dist/ 2>/dev/null | wc -l) files"
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html exists in dist/"
    else
        echo "❌ index.html missing in dist/"
    fi
else
    echo "❌ Build directory missing: dist/"
    echo "   Run: npm run build"
fi
echo ""

echo "🌐 Repository Status:"
echo "Current branch: $(git branch --show-current)"
echo "Remote branches:"
git branch -r
echo ""

echo "⚙️ GitHub Pages Settings to Check:"
echo "1. Go to: https://github.com/abhirao2901/Shoppify-Health-Kart/settings/pages"
echo "2. Verify these settings:"
echo "   ✅ Repository is PUBLIC (not private)"
echo "   ✅ Source: 'Deploy from a branch'"
echo "   ✅ Branch: 'gh-pages' (or 'GitHub Actions')"
echo "   ✅ Folder: '/ (root)'"
echo ""

echo "🚀 Quick Fix Commands:"
echo "# If build missing:"
echo "npm run build"
echo ""
echo "# If deployment fails:"
echo "npm run deploy"
echo ""
echo "# If gh-pages branch missing:"
echo "git checkout --orphan gh-pages"
echo "git rm -rf ."
echo "cp -r dist/* ."
echo "git add ."
echo "git commit -m 'Deploy to GitHub Pages'"
echo "git push origin gh-pages"
echo "git checkout main"
echo ""

echo "🌐 Live URL (after setup): https://abhirao2901.github.io/Shoppify-Health-Kart"
