import React, { useState } from 'react';
import { contactService } from '../services/contactService';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response  = await contactService.sendMessage(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );

      console.log("✅ API Response:", response);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'girdhari2302@gmail.com',
      link: 'mailto:girdhari2302@gmail.com'
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+91 7617004343',
      link: 'tel:+917617004343'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Meerut, Uttar Pradesh, India',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Girdhari0002',
      icon: '🐙'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/girdharisinghyadav/',
      icon: '💼'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/girdhari002/',
      icon: '💻'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Let's Connect</h1>
        <p style={styles.heroSubtitle}>Have a project in mind? Let's talk about it!</p>
      </div>

      <div style={styles.content}>
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Get In Touch</h2>
          
          <div style={styles.contactCards}>
            {contactInfo.map((info, idx) => (
              <a key={idx} href={info.link} style={styles.contactCard}>
                <div style={styles.cardIcon}>{info.icon}</div>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardLabel}>{info.label}</h3>
                  <p style={styles.cardValue}>{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          <h3 style={styles.socialTitle}>Follow Me</h3>
          <div style={styles.socialLinks}>
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                <span style={styles.socialIcon}>{social.icon}</span>
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.sectionTitle}>Send a Message</h2>
          
          {submitted && <p style={styles.success}>✓ Message sent successfully! I'll get back to you soon.</p>}
          {error && <p style={styles.error}>✗ {error}</p>}

          <div style={styles.group}>
            <label style={styles.label}>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Your name"
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="your.email@example.com"
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="What is this about?"
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={styles.textarea}
              placeholder="Your message here..."
            />
          </div>

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
    paddingBottom: '40px',
    borderBottom: '2px solid rgba(168, 85, 247, 0.2)',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#666',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start',
  },
  infoSection: {
    paddingRight: '20px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#0f172a',
  },
  contactCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  cardIcon: {
    fontSize: '32px',
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#06B6D4',
    margin: '0 0 5px 0',
  },
  cardValue: {
    fontSize: '16px',
    color: '#333',
    margin: 0,
  },
  socialTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#0f172a',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  socialLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    color: '#06B6D4',
    textDecoration: 'none',
    borderRadius: '6px',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  socialIcon: {
    fontSize: '20px',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  group: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    fontSize: '14px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    resize: 'vertical',
    transition: 'all 0.3s ease',
  },
  btn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
    transition: 'all 0.3s ease',
  },
  success: {
    color: '#10b981',
    marginBottom: '15px',
    padding: '12px',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  error: {
    color: '#ef4444',
    marginBottom: '15px',
    padding: '12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
};
