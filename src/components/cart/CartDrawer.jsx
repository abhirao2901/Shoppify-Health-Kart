import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import Button from '../common/Button';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    getItemCount, 
    getSubtotal, 
    getTaxAmount, 
    getTotal,
    formatPrice 
  } = useCart();

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className={styles.backdrop}
          onClick={handleBackdropClick}
          aria-label="Close cart"
        />
      )}

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Shopping Cart ({getItemCount()})
          </h2>
          <button 
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close cart"
          >
            <span className={styles.closeIcon}>✕</span>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>🛒</div>
              <h3 className={styles.emptyTitle}>Your cart is empty</h3>
              <p className={styles.emptyMessage}>
                Discover our amazing health supplements and start your wellness journey!
              </p>
              <Link to="/products" onClick={onClose}>
                <Button variant="primary" size="large">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className={styles.itemsList}>
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                  />
                ))}
              </div>

              {/* Summary */}
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal:</span>
                  <span className={styles.summaryValue}>
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Tax (5%):</span>
                  <span className={styles.summaryValue}>
                    {formatPrice(getTaxAmount())}
                  </span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span className={styles.summaryLabel}>Total:</span>
                  <span className={styles.summaryValue}>
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <Link to="/cart" onClick={onClose} className={styles.actionLink}>
                  <Button variant="outline" fullWidth>
                    View Cart
                  </Button>
                </Link>
                <Link to="/checkout" onClick={onClose} className={styles.actionLink}>
                  <Button variant="accent" fullWidth>
                    Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
