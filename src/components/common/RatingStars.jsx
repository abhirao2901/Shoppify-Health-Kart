import styles from './RatingStars.module.css';

const RatingStars = ({ 
  rating, 
  maxRating = 5, 
  size = 'medium',
  showNumber = false,
  className = '' 
}) => {
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= rating;
    const isPartial = rating > i - 1 && rating < i;
    const fillPercentage = isPartial ? ((rating % 1) * 100) : 0;
    
    stars.push(
      <span
        key={i}
        className={`${styles.star} ${styles[`star--${size}`]} ${
          isFilled ? styles['star--filled'] : ''
        } ${isPartial ? styles['star--partial'] : ''}`}
        style={isPartial ? {
          background: `linear-gradient(90deg, #ffc107 ${fillPercentage}%, #e0e0e0 ${fillPercentage}%)`
        } : undefined}
      >
        ⭐
      </span>
    );
  }
  
  return (
    <div className={`${styles.ratingContainer} ${className}`}>
      <div className={styles.starsContainer}>
        {stars}
      </div>
      {showNumber && (
        <span className={styles.ratingNumber}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
