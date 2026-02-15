import { useState } from 'react';
import Button from '../components/common/Button';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'support@healthsupp.com',
      link: 'mailto:support@healthsupp.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Address',
      value: '123 Wellness Street, Health City, HC 12345',
      link: null
    }
  ];

  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            We're here to help you on your wellness journey
          </p>
        </div>

        <div className={styles.content}>
          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle}>Get in Touch</h2>
            <div className={styles.infoGrid}>
              {contactInfo.map((info, index) => (
                <div key={index} className={styles.infoCard}>
                  <div className={styles.infoIcon}>{info.icon}</div>
                  <div className={styles.infoContent}>
                    <h3 className={styles.infoTitle}>{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className={styles.infoLink}>
                        {info.value}
                      </a>
                    ) : (
                      <p className={styles.infoValue}>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Send us a Message</h2>
            
            {submitted && (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✅</div>
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={styles.textarea}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={isSubmitting}
                disabled={isSubmitting || submitted}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faq}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>How long does shipping take?</h3>
              <p className={styles.faqAnswer}>
                Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Do you offer returns?</h3>
              <p className={styles.faqAnswer}>
                Yes, we offer a 30-day money-back guarantee on all products. Items must be unopened and in original condition.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Are your supplements third-party tested?</h3>
              <p className={styles.faqAnswer}>
                All our supplements undergo rigorous third-party testing for purity, potency, and safety.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Do you offer bulk discounts?</h3>
              <p className={styles.faqAnswer}>
                Yes, we offer volume discounts for orders over certain quantities. Contact us for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
