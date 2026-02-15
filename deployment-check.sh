#!/bin/bash

echo "🔍 Deployment Status Check"
echo "=========================="
echo ""

echo "📦 Built Assets:"
if [ -d "dist" ]; then
    echo "✅ dist/ directory exists"
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html exists"
        # Check if assets have correct paths
        if grep -q "/Shoppify-Health-Kart/assets/" dist/index.html; then
            echo "✅ Asset paths correctly set for GitHub Pages"
        else
            echo "❌ Asset paths need fixing - should contain '/Shoppify-Health-Kart/assets/'"
        fi
    else
        echo "❌ index.html missing in dist/"
    fi
else
    echo "❌ dist/ directory missing - run: npm run build"
fi

echo ""
echo "🌐 GitHub Pages Status:"
echo "Repository: https://github.com/abhirao2901/Shoppify-Health-Kart"
echo "Settings: https://github.com/abhirao2901/Shoppify-Health-Kart/settings/pages"
echo "Live URL: https://abhirao2901.github.io/Shoppify-Health-Kart"

echo ""
echo "🚀 Quick Deploy Commands:"
echo "# For GitHub Pages:"
echo "NODE_ENV=production npm run build"
echo "npm run deploy"
echo ""
echo "# For Netlify (drag & drop):"
echo "npm run build"
echo "# Then drag 'dist' folder to https://netlify.com"
echo ""
echo "# For Vercel:"
echo "npm install -g vercel"
echo "vercel --prod"

echo ""
echo "🔧 Fix 404 Errors:"
echo "1. Ensure assets load from /Shoppify-Health-Kart/assets/"
echo "2. Check browser console (F12) for specific errors"
echo "3. Wait 5-10 minutes for GitHub Pages propagation"
echo "4. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)"
