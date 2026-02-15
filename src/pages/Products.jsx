import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import mockProducts from '../data/mock.json';
import { withImages } from '../data/applyImages';
import styles from './Products.module.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const productsWithImages = withImages(mockProducts);
      setProducts(productsWithImages);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Get URL parameters
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    
    setFilterCategory(category);
    setSearchQuery(search);
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price * (1 - a.discount / 100)) - (b.price * (1 - b.discount / 100));
        case 'price-high':
          return (b.price * (1 - b.discount / 100)) - (a.price * (1 - a.discount / 100));
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, filterCategory, searchQuery, sortBy]);

  const categories = [
    'all',
    ...new Set(mockProducts.map(product => product.category))
  ];

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} />
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.products}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Products</h1>
          <p className={styles.subtitle}>
            Discover our complete range of premium health supplements
          </p>
        </div>

        <div className={styles.filters}>
          {/* Category Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="category-filter" className={styles.filterLabel}>
              Category:
            </label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={styles.filterSelect}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="sort-filter" className={styles.filterLabel}>
              Sort by:
            </label>
            <select
              id="sort-filter"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <p className={styles.resultCount}>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3 className={styles.noResultsTitle}>No products found</h3>
            <p className={styles.noResultsMessage}>
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
