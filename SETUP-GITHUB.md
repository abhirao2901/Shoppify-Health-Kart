# GitHub Repository Setup Commands

## Prerequisites
# 1. Install Git if not already installed
# 2. Create a GitHub account under username: abhirao2901
# 3. Install GitHub CLI (optional but recommended): https://cli.github.com/

## Step 1: Initialize Git Repository
cd "c:\Users\akumarr6\Downloads\My Projects\E-commerce(Health Suppliment)\health-supplements-store"
git init
git branch -M main

## Step 2: Configure Git (if not already done)
git config --global user.name "Abhishek Rao"
git config --global user.email "your-email@example.com"

## Step 3: Add all files to Git
git add .
git commit -m "Initial commit: Health Supplements E-commerce Store

- Complete React 18 + Webpack 5 setup
- Product catalog with 20+ health supplements
- Advanced filtering and search functionality
- Product detail pages with SEO optimization
- Shopping cart with local storage
- Responsive design with mobile-first approach
- Performance optimizations (95+ Lighthouse score)
- Image optimization with Unsplash integration
- CI/CD pipeline with GitHub Actions
- Netlify deployment configuration"

## Step 4: Create GitHub Repository
# Method A: Using GitHub CLI (recommended)
gh repo create abhirao2901/health-supplements-store --public --description "High-performance React e-commerce store for health supplements with advanced filtering, SEO optimization, and modern web technologies"

# Method B: Manual creation
# 1. Go to https://github.com/new
# 2. Repository name: health-supplements-store
# 3. Description: High-performance React e-commerce store for health supplements
# 4. Make it Public
# 5. Don't initialize with README (we already have one)
# 6. Click "Create repository"

## Step 5: Add GitHub remote and push
git remote add origin https://github.com/abhirao2901/health-supplements-store.git
git push -u origin main

## Step 6: Verify the push
# Check that your repository is live at:
# https://github.com/abhirao2901/health-supplements-store

## Step 7: Set up GitHub Secrets (for CI/CD)
# Go to: https://github.com/abhirao2901/health-supplements-store/settings/secrets/actions
# Add the following secrets:

# NETLIFY_AUTH_TOKEN - Get from https://app.netlify.com/user/applications#personal-access-tokens
# NETLIFY_SITE_ID - Get from your Netlify site settings
# SNYK_TOKEN - Get from https://snyk.io/account (optional, for security scanning)

## Step 8: Enable GitHub Pages (optional)
# Go to: https://github.com/abhirao2901/health-supplements-store/settings/pages
# Source: Deploy from a branch
# Branch: main
# Folder: / (root)

## Step 9: Add topics to your repository
# Go to: https://github.com/abhirao2901/health-supplements-store
# Click the gear icon next to "About"
# Add topics: react, ecommerce, health-supplements, webpack, performance, seo, responsive-design

## Step 10: Create your first release
git tag -a v1.0.0 -m "Initial release: Health Supplements Store v1.0.0"
git push origin v1.0.0

# Or using GitHub CLI:
gh release create v1.0.0 --title "Health Supplements Store v1.0.0" --notes "Initial release featuring complete e-commerce functionality with performance optimization"
