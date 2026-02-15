import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/common/RatingStars';
import Button from '../components/common/Button';
import mockProducts from '../data/mock.json';
import { withImages, placeholder } from '../data/applyImages';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, formatPrice } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Find product by ID
    const foundProduct = mockProducts.find(p => p.id === productId);
    
    if (!foundProduct) {
      navigate('/404', { replace: true });
      return;
    }

    // Apply images to the product
    const productsWithImages = withImages([foundProduct]);
    setProduct(productsWithImages[0]);
    setLoading(false);
  }, [productId, navigate]);

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addToCart(product, quantity);
      setIsLoading(false);
      
      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 300);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return null; // Will redirect to 404
  }

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const isBestseller = product.rating >= 4.7;
  const isLowStock = product.stock <= 10 && product.stock > 0;
  const isOutOfStock = product.stock === 0;
  const inCart = isInCart(product.id);

  // Generate SEO-friendly slug from product name
  const slug = product.name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image || placeholder,
    "sku": product.id,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "HealthSupplements Store"
    },
    "offers": {
      "@type": "Offer",
      "price": (discountedPrice / 100).toFixed(2),
      "priceCurrency": "USD",
      "availability": isOutOfStock ? "OutOfStock" : "InStock",
      "seller": {
        "@type": "Organization",
        "name": "HealthSupplements Store"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | HealthSupplements Store</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={product.tags.join(', ')} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image || placeholder} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${window.location.origin}/product/${product.id}`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image || placeholder} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`${window.location.origin}/products/${slug}`} />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className={styles.productDetail}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className={styles.productContainer}>
          {/* Product Image */}
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img
                src={product.image || placeholder}
                alt={product.imageAlt || `${product.name} product image`}
                className={styles.productImage}
                width={600}
                height={600}
                onError={(e) => {
                  if (e.currentTarget.src !== placeholder) {
                    e.currentTarget.src = product.fallback || placeholder;
                  }
                }}
              />
              
              {/* Badges */}
              <div className={styles.badges}>
                {isBestseller && (
                  <span className={styles.bestsellerBadge}>⭐ Bestseller</span>
                )}
                {product.discount > 0 && (
                  <span className={styles.discountBadge}>-{product.discount}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.infoSection}>
            <div className={styles.productHeader}>
              <h1 className={styles.productName}>{product.name}</h1>
              <div className={styles.category}>{product.category}</div>
            </div>

            {/* Rating & Reviews */}
            <div className={styles.rating}>
              <RatingStars rating={product.rating} />
              <span className={styles.ratingText}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className={styles.pricing}>
              <span className={styles.currentPrice}>
                {formatPrice(discountedPrice)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className={styles.originalPrice}>
                    {formatPrice(product.price)}
                  </span>
                  <span className={styles.savings}>
                    Save {formatPrice(product.price - discountedPrice)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className={styles.stockStatus}>
              {isOutOfStock ? (
                <span className={styles.outOfStock}>Out of Stock</span>
              ) : isLowStock ? (
                <span className={styles.lowStock}>Only {product.stock} left!</span>
              ) : (
                <span className={styles.inStock}>In Stock ({product.stock} available)</span>
              )}
            </div>

            {/* Add to Cart Section */}
            {!isOutOfStock && (
              <div className={styles.addToCart}>
                <div className={styles.quantitySelector}>
                  <label htmlFor="quantity">Quantity:</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    max={product.stock}
                  >
                    {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || inCart}
                  variant="primary"
                  className={styles.addToCartButton}
                >
                  {isLoading ? 'Adding...' : inCart ? 'In Cart' : `Add to Cart - ${formatPrice(discountedPrice * quantity)}`}
                </Button>
              </div>
            )}

            {/* Tags */}
            <div className={styles.tags}>
              {product.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/products?search=${encodeURIComponent(tag)}`}
                  className={styles.tag}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className={styles.productTabs}>
          <nav className={styles.tabNav}>
            <button
              className={selectedTab === 'description' ? styles.activeTab : styles.tab}
              onClick={() => setSelectedTab('description')}
            >
              Description
            </button>
            <button
              className={selectedTab === 'ingredients' ? styles.activeTab : styles.tab}
              onClick={() => setSelectedTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              className={selectedTab === 'nutrition' ? styles.activeTab : styles.tab}
              onClick={() => setSelectedTab('nutrition')}
            >
              Nutrition Facts
            </button>
          </nav>

          <div className={styles.tabContent}>
            {selectedTab === 'description' && (
              <div className={styles.description}>
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            {selectedTab === 'ingredients' && (
              <div className={styles.ingredients}>
                <h3>Ingredients</h3>
                <p>{product.ingredients}</p>
              </div>
            )}

            {selectedTab === 'nutrition' && (
              <div className={styles.nutrition}>
                <h3>Nutrition Facts</h3>
                <p>{product.nutritionFacts}</p>
              </div>
            )}
          </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className={styles.toast} role="alert">
            ✅ Added to cart successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
