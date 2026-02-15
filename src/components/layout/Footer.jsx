import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Careers', path: '#' },
        { label: 'Press', path: '#' }
      ]
    },
    shop: {
      title: 'Shop',
      links: [
        { label: 'All Products', path: '/products' },
        { label: 'Protein Powder', path: '/products?category=Protein Powder' },
        { label: 'Vitamins', path: '/products?category=Vitamin' },
        { label: 'Sports Nutrition', path: '/products?category=Sports Nutrition' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '#' },
        { label: 'Shipping Info', path: '#' },
        { label: 'Returns', path: '#' },
        { label: 'Track Order', path: '#' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '#' },
        { label: 'Terms of Service', path: '#' },
        { label: 'Cookie Policy', path: '#' },
        { label: 'Disclaimer', path: '#' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerMain}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <Link to="/" className={styles.footerLogo}>
              <span className={styles.logoIcon}>🌿</span>
              <span className={styles.logoText}>HealthSupp</span>
            </Link>
            <p className={styles.companyDescription}>
              Your trusted source for premium health supplements. 
              We provide high-quality products to support your wellness journey.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className={styles.footerNav}>
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.linkList}>
                  {section.links.map((link, index) => (
                    <li key={index}>
                      {link.path.startsWith('#') ? (
                        <a href={link.path} className={styles.footerLink}>
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.path} className={styles.footerLink}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>
            <p className={styles.newsletterDescription}>
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} HealthSupp. All rights reserved.</p>
          </div>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentText}>We accept:</span>
            <div className={styles.paymentIcons}>
              <span className={styles.paymentIcon}>💳</span>
              <span className={styles.paymentIcon}>💰</span>
              <span className={styles.paymentIcon}>🏦</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
