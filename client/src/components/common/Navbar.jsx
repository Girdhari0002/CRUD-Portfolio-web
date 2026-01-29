import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export const Navbar = ({ user, onLogout }) => {
  const [profile, setProfile] = useState({
    name: 'Girdhari Singh Yadav',
    photoUrl: 'https://avatars.githubusercontent.com/u/Girdhari0002'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getAdminProfile();
        if (data.profile) {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback to defaults
      }
    };

    fetchProfile();

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchProfile();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img
            src={profile.photoUrl}
            alt={profile.name}
            style={styles.profilePhoto}
            onError={(e) => (e.target.style.display = 'none')}
          />
          <h1 style={styles.logoText}>{profile.name}</h1>
        </div>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/projects" style={styles.link}>Projects</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>

          {user ? (
            <>
              <Link to="/admin" style={styles.link}>Admin</Link>
              <button onClick={onLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.link}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  profilePhoto: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #06B6D4',
    objectFit: 'cover',
  },
  logoText: {
    margin: 0,
    fontSize: '20px',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#d1d5db',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  },
  logoutBtn: {
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};
