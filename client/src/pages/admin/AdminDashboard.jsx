import React, { useState, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import axios from 'axios';

export const AdminDashboard = () => {
  const { projects, fetchProjects } = useProjects();
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    featuredProjects: 0,
    totalContacts: 0,
    unreadContacts: 0,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProjects();
    fetchContacts();
  }, [fetchProjects]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data.data || []);
    } catch (err) {
      console.log('Failed to fetch contacts');
    }
  };

  useEffect(() => {
    setStats({
      totalProjects: projects.length,
      publishedProjects: projects.filter((p) => p.status === 'published').length,
      featuredProjects: projects.filter((p) => p.featured).length,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter((c) => !c.isRead).length,
    });
  }, [projects, contacts]);

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>Total Projects</h3>
          <p style={styles.number}>{stats.totalProjects}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Published</h3>
          <p style={styles.number}>{stats.publishedProjects}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Featured</h3>
          <p style={styles.number}>{stats.featuredProjects}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Contacts</h3>
          <p style={styles.number}>{stats.totalContacts}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Unread Messages</h3>
          <p style={{...styles.number, color: '#FF6B6B'}}>{stats.unreadContacts}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Quick Actions</h2>
        <div style={styles.actions}>
          <a href="/admin/manage" style={styles.actionBtn}>
            Manage Projects
          </a>
          <a href="/admin/profile" style={styles.actionBtn}>
            Profile Settings
          </a>
          <a href="/admin/contacts" style={styles.actionBtn}>
            Manage Contacts
          </a>
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  number: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0066cc',
    margin: 0,
  },
  section: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  actionBtn: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#333',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
};
