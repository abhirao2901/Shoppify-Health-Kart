import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.message}>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className={styles.actions}>
            <Link to="/">
              <Button variant="primary" size="large">
                Go Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="large">
                Shop Products
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.illustration}>
          <span className={styles.icon}>🔍</span>
          <p className={styles.iconText}>Page not found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
