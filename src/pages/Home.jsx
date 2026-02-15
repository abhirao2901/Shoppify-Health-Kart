import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import mockProducts from '../data/mock.json';
import { withImages } from '../data/applyImages';
import styles from './Home.module.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const productsWithImages = withImages(mockProducts);
      
      // Get bestsellers (rating >= 4.7)
      const bestsellers = productsWithImages
        .filter(product => product.rating >= 4.7)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

      // Get featured products (high discount or popular categories)
      const featured = productsWithImages
        .filter(product => 
          product.discount > 10 || 
          ['Protein Powder', 'Sports Nutrition', 'Multivitamin'].includes(product.category)
        )
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 8);

      setFeaturedProducts(featured);
      setBestSellingProducts(bestsellers);
      setIsLoading(false);
    }, 500);
  }, []);

  const categories = [
    {
      name: 'Protein Powder',
      icon: '💪',
      description: 'Build muscle and recover faster',
      count: mockProducts.filter(p => p.category === 'Protein Powder').length
    },
    {
      name: 'Vitamins',
      icon: '🍊',
      description: 'Essential daily nutrients',
      count: mockProducts.filter(p => p.category === 'Vitamin').length
    },
    {
      name: 'Sports Nutrition',
      icon: '⚡',
      description: 'Enhance performance',
      count: mockProducts.filter(p => p.category === 'Sports Nutrition').length
    },
    {
      name: 'Herbal Supplements',
      icon: '🌿',
      description: 'Natural wellness solutions',
      count: mockProducts.filter(p => p.category === 'Herbal Supplement').length
    }
  ];

  const benefits = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: '100% secure transactions'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Expert customer service'
    },
    {
      icon: '💯',
      title: 'Quality Guarantee',
      description: 'Premium ingredients only'
    }
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Premium Health Supplements for Your Wellness Journey
            </h1>
            <p className={styles.heroSubtitle}>
              Discover high-quality supplements designed to support your health goals. 
              From protein powders to vitamins, we have everything you need to feel your best.
            </p>
            <div className={styles.heroActions}>
              <Link to="/products">
                <Button variant="accent" size="large">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="large">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImagePlaceholder}>
              <span className={styles.heroIcon}>🌿</span>
              <span className={styles.heroIconText}>HealthSupp</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  {benefit.icon}
                </div>
                <h3 className={styles.benefitTitle}>
                  {benefit.title}
                </h3>
                <p className={styles.benefitDescription}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <p className={styles.sectionSubtitle}>
              Find the perfect supplements for your needs
            </p>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>
                  {category.icon}
                </div>
                <h3 className={styles.categoryName}>
                  {category.name}
                </h3>
                <p className={styles.categoryDescription}>
                  {category.description}
                </p>
                <span className={styles.categoryCount}>
                  {category.count} products
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className={styles.bestsellers}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Bestsellers</h2>
            <p className={styles.sectionSubtitle}>
              Our most popular and highly-rated products
            </p>
          </div>
          {isLoading ? (
            <div className={styles.loadingGrid}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className={styles.loadingCard}>
                  <div className={styles.loadingSpinner} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {bestSellingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <p className={styles.sectionSubtitle}>
              Special deals and premium supplements
            </p>
          </div>
          {isLoading ? (
            <div className={styles.loadingGrid}>
              {[...Array(8)].map((_, index) => (
                <div key={index} className={styles.loadingCard}>
                  <div className={styles.loadingSpinner} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className={styles.sectionFooter}>
            <Link to="/products">
              <Button variant="primary" size="large">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Start Your Wellness Journey?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of satisfied customers who trust HealthSupp for their supplement needs.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/products">
                <Button variant="secondary" size="large">
                  Shop Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="large">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
