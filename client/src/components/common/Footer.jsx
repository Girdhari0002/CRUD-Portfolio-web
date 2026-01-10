import React from 'react';

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; 2026 . All rights reserved.</p>
        <div style={styles.socials}>
          <a href="https://github.com/Girdhari0002?tab=repositories" style={styles.social}>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/girdharisinghyadav/" style={styles.social}>
            LinkedIn
          </a>
          <a href="https://x.com/Girdhari_4343" style={styles.social}>
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    borderTop: '1px solid rgba(168, 85, 247, 0.2)',
    color: 'white',
    padding: '30px 0',
    marginTop: '50px',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  socials: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  social: {
    color: '#06B6D4',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    fontWeight: '600',
  },
};
