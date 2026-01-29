import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';

export const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Girdhari Singh Yadav',
    photoUrl: 'https://avatars.githubusercontent.com/u/Girdhari0002'
  });
  const [message, setMessage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(profile.photoUrl);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load profile from backend
    const loadProfile = async () => {
      try {
        const data = await authService.getMe();
        if (data.user) {
          const userProfile = {
            name: data.user.name || 'Girdhari Singh Yadav',
            photoUrl: data.user.photoUrl || 'https://avatars.githubusercontent.com/u/Girdhari0002'
          };
          setProfile(userProfile);
          setPreviewUrl(userProfile.photoUrl);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    if (name === 'photoUrl') {
      setPreviewUrl(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' });
      return;
    }

    if (!profile.photoUrl.trim()) {
      setMessage({ type: 'error', text: 'Photo URL is required' });
      return;
    }

    setLoading(true);
    try {
      await authService.updateProfile(profile);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Dispatch custom event to notify Navbar and other components
      window.dispatchEvent(new CustomEvent('profileUpdated', { detail: profile }));

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Profile Settings</h1>
        <p>Manage your portfolio profile information and photo</p>
      </div>

      {message && (
        <div
          style={{
            ...styles.message,
            backgroundColor: message.type === 'success' ? '#e8f5e9' : '#ffebee',
            color: message.type === 'success' ? '#2e7d32' : '#c62828',
            borderColor: message.type === 'success' ? '#4caf50' : '#f44336',
          }}
        >
          {message.type === 'success' ? '✓' : '✗'} {message.text}
        </div>
      )}

      <div style={styles.content}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>Profile Information</h2>

          <div style={styles.group}>
            <label style={styles.label}>Your Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={styles.input}
            />
            <small style={styles.hint}>This will appear in the navbar</small>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>GitHub Profile Photo URL</label>
            <input
              type="url"
              name="photoUrl"
              value={profile.photoUrl}
              onChange={handleChange}
              placeholder="https://avatars.githubusercontent.com/u/your-username"
              style={styles.input}
            />
            <small style={styles.hint}>
              Get your GitHub profile photo URL from: https://avatars.githubusercontent.com/u/YOUR-GITHUB-USERNAME
            </small>
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>

        <div style={styles.preview}>
          <h2 style={styles.previewTitle}>Preview</h2>
          <div style={styles.previewCard}>
            <div style={styles.navbarPreview}>
              <div style={styles.previewLogo}>
                <img
                  src={previewUrl}
                  alt={profile.name}
                  style={styles.previewPhoto}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/40';
                  }}
                />
                <span style={styles.previewName}>{profile.name}</span>
              </div>
            </div>
            <small style={styles.hintSmall}>This is how your profile will look in the navbar</small>
          </div>

          <div style={styles.instructionsCard}>
            <h3 style={styles.instructionsTitle}>📝 How to Get Your GitHub Profile Photo URL</h3>
            <ol style={styles.instructionsList}>
              <li>Go to <strong>https://github.com/YOUR-USERNAME</strong></li>
              <li>Right-click your profile picture and copy the image URL</li>
              <li>Or use this format: <code>https://avatars.githubusercontent.com/u/GITHUB-USER-ID</code></li>
              <li>Find your GitHub User ID by visiting <strong>https://api.github.com/users/YOUR-USERNAME</strong></li>
              <li>Paste the URL in the "GitHub Profile Photo URL" field above</li>
            </ol>
          </div>
        </div>
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
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '30px',
    borderBottom: '2px solid rgba(168, 85, 247, 0.2)',
  },
  message: {
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '20px',
    border: '1px solid',
    fontWeight: '500',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#0f172a',
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
  hint: {
    display: 'block',
    marginTop: '6px',
    fontSize: '12px',
    color: '#A855F7',
  },
  submitBtn: {
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
  preview: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  previewTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0f172a',
  },
  previewCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  navbarPreview: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '12px',
  },
  previewLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  previewPhoto: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #06B6D4',
    objectFit: 'cover',
  },
  previewName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  hintSmall: {
    display: 'block',
    fontSize: '12px',
    color: '#666',
  },
  instructionsCard: {
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid rgba(6, 182, 212, 0.2)',
  },
  instructionsTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#06B6D4',
  },
  instructionsList: {
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.8',
    paddingLeft: '20px',
  },
};
