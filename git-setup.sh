#!/bin/bash

# Shoppify Health Kart - Git Setup Script
# This script prepares the project for GitHub upload

echo "🚀 Setting up Shoppify Health Kart for GitHub..."

# Remove any existing Git configuration
rm -rf .git

# Initialize new Git repository
git init

# Configure Git user (local to this repository)
git config user.name "abhirao2901"
git config user.email "abhirao2901@users.noreply.github.com"

# Add remote repository
git remote add origin git@github.com:abhirao2901/Shoppify-Health-Kart.git

# Add all files to staging
git add .

# Create initial commit
git commit -m "🎉 Initial commit: Shoppify Health Kart - Complete E-commerce Platform

✅ Features:
- React 18 + Webpack 5 + Babel
- Complete Product Detail Pages (PDP) with SEO
- Shopping Cart with Local Storage
- Responsive Design with CSS Modules
- Image Optimization & Performance Monitoring
- GitHub Actions CI/CD Pipeline
- Netlify Deployment Ready

🔧 Technical Stack:
- Frontend: React, React Router, React Helmet
- Build: Webpack 5, Babel 7, PostCSS
- Styling: CSS Modules, Responsive Design
- Testing: Lighthouse CI, Performance Budgets
- Deployment: Netlify, GitHub Actions"

echo "✅ Git repository initialized successfully!"
echo ""
echo "📋 Next Steps for GitHub Upload:"
echo "1. Create a new repository on GitHub: https://github.com/abhirao2901/Shoppify-Health-Kart"
echo "2. Run: git push -u origin main"
echo ""
echo "🌐 Repository URL: git@github.com:abhirao2901/Shoppify-Health-Kart.git"
echo "👤 User: abhirao2901"
echo ""
echo "🎯 Project is ready for GitHub deployment!"
