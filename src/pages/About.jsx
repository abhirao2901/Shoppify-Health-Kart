import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>About HealthSupp</h1>
          <p className={styles.subtitle}>
            Your trusted partner in health and wellness
          </p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.text}>
              At HealthSupp, we are dedicated to providing premium quality health supplements 
              that support your wellness journey. We believe that everyone deserves access to 
              high-quality, science-backed nutritional products that help them live their best life.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Commitment</h2>
            <div className={styles.commitments}>
              <div className={styles.commitment}>
                <div className={styles.commitmentIcon}>🔬</div>
                <h3 className={styles.commitmentTitle}>Science-Based</h3>
                <p className={styles.commitmentText}>
                  All our products are backed by scientific research and testing.
                </p>
              </div>
              <div className={styles.commitment}>
                <div className={styles.commitmentIcon}>🌱</div>
                <h3 className={styles.commitmentTitle}>Natural Ingredients</h3>
                <p className={styles.commitmentText}>
                  We source only the finest natural ingredients from trusted suppliers.
                </p>
              </div>
              <div className={styles.commitment}>
                <div className={styles.commitmentIcon}>✅</div>
                <h3 className={styles.commitmentTitle}>Quality Assured</h3>
                <p className={styles.commitmentText}>
                  Every product undergoes rigorous quality testing for purity and potency.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
            <ul className={styles.benefits}>
              <li className={styles.benefit}>Premium quality ingredients</li>
              <li className={styles.benefit}>Third-party tested for purity</li>
              <li className={styles.benefit}>Fast and reliable shipping</li>
              <li className={styles.benefit}>Expert customer support</li>
              <li className={styles.benefit}>Satisfaction guarantee</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
