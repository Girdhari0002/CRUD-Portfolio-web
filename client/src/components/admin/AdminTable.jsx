import React from 'react';
import { useProjects } from '../../hooks/useProjects';

export const AdminTable = ({ projects, onEdit, onDelete, onToggleFeatured }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(id);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Projects Management</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project._id} style={styles.bodyRow}>
                <td>{project.title}</td>
                <td>{project.category}</td>
                <td>{project.status}</td>
                <td>
                  <button
                    onClick={() => onToggleFeatured(project._id)}
                    style={{
                      ...styles.btn,
                      backgroundColor: project.featured ? '#ffd700' : '#ccc',
                    }}
                  >
                    {project.featured ? '★' : '☆'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => onEdit(project._id)}
                    style={{ ...styles.btn, backgroundColor: '#0066cc' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    style={{ ...styles.btn, backgroundColor: '#ff6b6b', marginLeft: '5px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No projects found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerRow: {
    backgroundColor: '#333',
    color: 'white',
  },
  bodyRow: {
    borderBottom: '1px solid #ddd',
  },
  btn: {
    padding: '6px 12px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
