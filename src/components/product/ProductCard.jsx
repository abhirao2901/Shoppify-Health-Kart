import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import RatingStars from '../common/RatingStars';
import Button from '../common/Button';
import { placeholder } from '../../data/applyImages';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, formatPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addToCart(product, 1);
      setIsLoading(false);
      
      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }, 300);
  };

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const isBestseller = product.rating >= 4.7;
  const isLowStock = product.stock <= 10 && product.stock > 0;
  const isOutOfStock = product.stock === 0;
  const inCart = isInCart(product.id);

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img 
            src={product.image || placeholder} 
            alt={product.imageAlt || `${product.name} product image`}
            className={styles.productImage}
            loading="lazy"
            width={400}
            height={400}
            onError={(e) => { 
              if (e.currentTarget.src !== placeholder) {
                e.currentTarget.src = product.fallback || placeholder; 
              }
            }}
          />
          
          {/* Badges */}
          <div className={styles.badges}>
            {isBestseller && (
              <span className={styles.bestsellerBadge}>
                ⭐ Bestseller
              </span>
            )}
            {product.discount > 0 && (
              <span className={styles.discountBadge}>
                -{product.discount}%
              </span>
            )}
            {isOutOfStock && (
              <span className={styles.outOfStockBadge}>
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Category */}
          <div className={styles.category}>
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className={styles.productName}>
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className={styles.ratingContainer}>
            <RatingStars rating={product.rating} size="small" />
            <span className={styles.reviewCount}>
              ({product.reviews})
            </span>
          </div>

          {/* Description */}
          <p className={styles.description}>
            {product.description}
          </p>

          {/* Price */}
          <div className={styles.priceContainer}>
            {product.discount > 0 ? (
              <>
                <span className={styles.discountedPrice}>
                  {formatPrice(discountedPrice)}
                </span>
                <span className={styles.originalPrice}>
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className={styles.price}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {isLowStock && (
            <div className={styles.stockWarning}>
              Only {product.stock} left in stock!
            </div>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className={styles.actions}>
        <Button
          onClick={handleAddToCart}
          variant={inCart ? "secondary" : "primary"}
          size="medium"
          fullWidth
          loading={isLoading}
          disabled={isOutOfStock}
        >
          {isOutOfStock 
            ? 'Out of Stock' 
            : inCart 
              ? 'Add More' 
              : 'Add to Cart'
          }
        </Button>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className={styles.toast}>
          <span className={styles.toastIcon}>✓</span>
          Added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
