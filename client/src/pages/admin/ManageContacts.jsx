import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchContacts();
  }, []);

  

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data.data || []);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load contacts' });
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(contacts.filter(c => c._id !== id));
      setSelectedContact(null);
      setMessage({ type: 'success', text: 'Contact deleted successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete contact' });
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/contact/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(contacts.map(c => 
        c._id === id ? { ...c, isRead: true } : c
      ));
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, isRead: true });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update contact' });
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'unread') return !contact.isRead;
    if (filter === 'read') return contact.isRead;
    return true;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Manage Contact Messages</h1>
        <p>View and manage messages from visitors</p>
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

      <div style={styles.filterBar}>
        <button 
          onClick={() => setFilter('all')}
          style={{...styles.filterBtn, backgroundColor: filter === 'all' ? '#06B6D4' : '#e0e0e0'}}
        >
          All ({contacts.length})
        </button>
        <button 
          onClick={() => setFilter('unread')}
          style={{...styles.filterBtn, backgroundColor: filter === 'unread' ? '#06B6D4' : '#e0e0e0'}}
        >
          Unread ({contacts.filter(c => !c.isRead).length})
        </button>
        <button 
          onClick={() => setFilter('read')}
          style={{...styles.filterBtn, backgroundColor: filter === 'read' ? '#06B6D4' : '#e0e0e0'}}
        >
          Read ({contacts.filter(c => c.isRead).length})
        </button>
        <button 
          onClick={fetchContacts}
          style={styles.refreshBtn}
        >
          🔄 Refresh
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.listSection}>
          <h2>Messages</h2>
          {loading ? (
            <p style={styles.loadingText}>Loading contacts...</p>
          ) : filteredContacts.length === 0 ? (
            <p style={styles.emptyText}>No contacts found</p>
          ) : (
            <div style={styles.contactList}>
              {filteredContacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => {
                    setSelectedContact(contact);
                    if (!contact.isRead) {
                      markAsRead(contact._id);
                    }
                  }}
                  style={{
                    ...styles.contactItem,
                    backgroundColor: selectedContact?._id === contact._id ? 'rgba(6, 182, 212, 0.1)' : 'white',
                    borderLeft: selectedContact?._id === contact._id ? '4px solid #06B6D4' : '4px solid transparent',
                    fontWeight: contact.isRead ? 'normal' : 'bold',
                  }}
                >
                  <div style={styles.contactSummary}>
                    <h4 style={styles.contactName}>{contact.name}</h4>
                    <p style={styles.contactSubject}>{contact.subject}</p>
                    <p style={styles.contactEmail}>{contact.email}</p>
                  </div>
                  <div style={styles.contactMeta}>
                    {!contact.isRead && <span style={styles.unreadBadge}>New</span>}
                    <span style={styles.date}>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.detailSection}>
          {selectedContact ? (
            <div style={styles.detailCard}>
              <div style={styles.detailHeader}>
                <h2>{selectedContact.name}</h2>
                <div style={styles.detailActions}>
                  {!selectedContact.isRead && (
                    <button 
                      onClick={() => markAsRead(selectedContact._id)}
                      style={styles.readBtn}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button 
                    onClick={() => deleteContact(selectedContact._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div style={styles.detailInfo}>
                <div style={styles.infoRow}>
                  <strong>From:</strong>
                  <a href={`mailto:${selectedContact.email}`} style={styles.email}>
                    {selectedContact.email}
                  </a>
                </div>
                <div style={styles.infoRow}>
                  <strong>Subject:</strong>
                  <span>{selectedContact.subject}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Date:</strong>
                  <span>{new Date(selectedContact.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div style={styles.messageBox}>
                <h4>Message</h4>
                <p style={styles.messageText}>{selectedContact.message}</p>
              </div>

              <div style={styles.actions}>
                <a 
                  href={`mailto:${selectedContact.email}`}
                  style={styles.replyBtn}
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div style={styles.noSelection}>
              <p>Select a contact to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
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
  filterBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  refreshBtn: {
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    color: 'white',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '30px',
  },
  listSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '600px',
    overflowY: 'auto',
  },
  contactItem: {
    padding: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  contactSummary: {
    marginBottom: '8px',
  },
  contactName: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    color: '#0f172a',
  },
  contactSubject: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    color: '#06B6D4',
    fontWeight: '600',
  },
  contactEmail: {
    margin: 0,
    fontSize: '12px',
    color: '#999',
  },
  contactMeta: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: '#06B6D4',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  date: {
    fontSize: '11px',
    color: '#999',
  },
  loadingText: {
    textAlign: 'center',
    color: '#999',
    padding: '20px',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: '40px',
  },
  detailSection: {
    minHeight: '500px',
  },
  detailCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
  },
  detailActions: {
    display: 'flex',
    gap: '10px',
  },
  readBtn: {
    padding: '8px 16px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  deleteBtn: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  detailInfo: {
    marginBottom: '20px',
  },
  infoRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
    fontSize: '14px',
  },
  email: {
    color: '#06B6D4',
    textDecoration: 'none',
  },
  messageBox: {
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid rgba(6, 182, 212, 0.2)',
    marginBottom: '20px',
  },
  messageText: {
    color: '#333',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
  },
  noSelection: {
    backgroundColor: 'white',
    padding: '60px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#999',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  replyBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
};
