# 🏪 Shoppify Health Kart

A high-performance, modern React e-commerce application for health supplements with advanced filtering, SEO optimization, and exceptional user experience.

![Shoppify Health Kart](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Webpack](https://img.shields.io/badge/Webpack-5.90.3-orange.svg)
![Performance](https://img.shields.io/badge/Lighthouse-95%2B-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 Live Demo

- **GitHub Repository**: https://github.com/abhirao2901/Shoppify-Health-Kart
- **Live Site**: [Coming Soon]

## ✨ Features

### 🛍️ E-commerce Core
- **Product Catalog**: 20+ health supplements with detailed information
- **Advanced Filtering**: Category, price, rating, and tag-based filtering
- **Product Detail Pages**: Comprehensive product information with SEO optimization
- **Shopping Cart**: Full cart functionality with local storage persistence
- **Responsive Design**: Mobile-first approach with desktop optimization

### ⚡ Performance & SEO
- **Lighthouse Score**: 95+ on all core metrics
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Image Optimization**: WebP/AVIF support with responsive loading
- **SEO Ready**: Meta tags, structured data, and semantic HTML
- **PWA Ready**: Service worker and offline capabilities

### 🎨 Modern Tech Stack
- **React 18**: Latest React features with hooks and context
- **Webpack 5**: Advanced bundling with code splitting
- **CSS Modules**: Scoped styling with modern CSS features
- **Node 16+ Compatible**: Modern JavaScript features

## 🛠️ Installation

### Prerequisites
- Node.js 16+ 
- npm 8+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/abhirao2901/Shoppify-Health-Kart.git

# Navigate to project directory
cd Shoppify-Health-Kart

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080 in your browser
```

## 📊 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build

# Performance
npm run build:analyze    # Analyze bundle size
npm run lighthouse      # Run Lighthouse audit

# Images
npm run images:download # Download and optimize product images

# Deployment
npm run deploy:netlify  # Deploy to Netlify
```

## 🏗️ Project Structure

```
health-supplements-store/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components (Home, Products, PDP)
│   ├── context/          # React context (Cart, etc.)
│   ├── data/             # Mock data and image management
│   ├── hooks/            # Custom React hooks
│   └── styles/           # Global styles and CSS modules
├── public/               # Static assets
├── scripts/              # Build and utility scripts
└── webpack.config.cjs    # Webpack configuration
```

## 🎯 Performance Targets

- **Lighthouse Performance**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 👨‍💻 Author

**Abhishek Rao**
- GitHub: [@abhirao2901](https://github.com/abhirao2901)

---

⭐ **Star this repository if you found it helpful!**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
