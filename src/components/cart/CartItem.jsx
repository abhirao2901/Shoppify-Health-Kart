import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import RatingStars from '../common/RatingStars';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, formatPrice } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity === item.quantity) return;
    
    setIsUpdating(true);
    
    // Simulate a brief delay for UI feedback
    setTimeout(() => {
      updateQuantity(item.id, newQuantity);
      setIsUpdating(false);
    }, 200);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const discountedPrice = item.discount > 0 
    ? item.price * (1 - item.discount / 100)
    : item.price;

  const isLowStock = item.stock <= 10;
  const isOutOfStock = item.stock === 0;

  return (
    <div className={styles.cartItem}>
      {/* Product Image */}
      <div className={styles.imageContainer}>
        <img 
          src={item.images[0]} 
          alt={item.name}
          className={styles.productImage}
        />
        {item.discount > 0 && (
          <span className={styles.discountBadge}>
            -{item.discount}%
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className={styles.details}>
        {/* Product Name & Link */}
        <Link 
          to={`/product/${item.id}`} 
          className={styles.productName}
        >
          {item.name}
        </Link>

        {/* Rating */}
        <div className={styles.rating}>
          <RatingStars rating={item.rating} size="small" />
          <span className={styles.reviewCount}>
            ({item.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className={styles.priceContainer}>
          {item.discount > 0 ? (
            <>
              <span className={styles.discountedPrice}>
                {formatPrice(discountedPrice)}
              </span>
              <span className={styles.originalPrice}>
                {formatPrice(item.price)}
              </span>
            </>
          ) : (
            <span className={styles.price}>
              {formatPrice(item.price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {isOutOfStock ? (
          <div className={styles.stockStatus}>
            <span className={styles.outOfStock}>Out of Stock</span>
          </div>
        ) : isLowStock ? (
          <div className={styles.stockStatus}>
            <span className={styles.lowStock}>Only {item.stock} left</span>
          </div>
        ) : null}

        {/* Quantity Controls */}
        <div className={styles.quantityControls}>
          <label htmlFor={`quantity-${item.id}`} className={styles.quantityLabel}>
            Quantity:
          </label>
          <div className={styles.quantitySelector}>
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
              className={styles.quantityButton}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              id={`quantity-${item.id}`}
              type="number"
              min="1"
              max={item.stock}
              value={item.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= item.stock) {
                  handleQuantityChange(value);
                }
              }}
              className={styles.quantityInput}
              disabled={isUpdating}
            />
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.stock || isUpdating}
              className={styles.quantityButton}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Item Total */}
        <div className={styles.itemTotal}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalPrice}>
            {formatPrice(discountedPrice * item.quantity)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className={styles.removeButton}
        aria-label={`Remove ${item.name} from cart`}
      >
        <span className={styles.removeIcon}>🗑️</span>
      </button>

      {/* Loading Overlay */}
      {isUpdating && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner} />
        </div>
      )}
    </div>
  );
};

export default CartItem;
