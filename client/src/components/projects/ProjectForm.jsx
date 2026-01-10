import React, { useState, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';

export const ProjectForm = ({ initialData = null, onSubmit, onCancel = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      category: 'Web',
      featured: false,
      status: 'published',
    }
  );
  const [techInput, setTechInput] = useState('');

  // Update form data when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (idx) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || formData.title.trim().length < 5) {
      alert('Title must be at least 5 characters long');
      return;
    }
    
    if (!formData.description || formData.description.trim().length < 10) {
      alert('Description must be at least 10 characters long');
      return;
    }
    
    if (formData.technologies.length === 0) {
      alert('Please add at least one technology');
      return;
    }
    
    onSubmit(formData);
    
    // Reset form after successful submission
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        technologies: [],
        imageUrl: '',
        liveUrl: '',
        githubUrl: '',
        category: 'Web',
        featured: false,
        status: 'published',
      });
      setTechInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{initialData ? 'Edit Project' : 'Create Project'}</h2>

      <div style={styles.group}>
        <label>Title (min 5 characters)</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{
            ...styles.input,
            borderColor: formData.title.trim().length < 5 ? '#ff9800' : '#ddd'
          }}
        />
        <small style={{ color: formData.title.trim().length < 5 ? '#ff9800' : '#666' }}>
          {formData.title.trim().length} / 5 minimum
        </small>
      </div>

      <div style={styles.group}>
        <label>Description (min 10 characters)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
          style={{
            ...styles.textarea,
            borderColor: formData.description.trim().length < 10 ? '#ff9800' : '#ddd'
          }}
        />
        <small style={{ color: formData.description.trim().length < 10 ? '#ff9800' : '#666' }}>
          {formData.description.trim().length} / 10 minimum
        </small>
      </div>

      <div style={styles.group}>
        <label>Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Live URL</label>
        <input
          type="url"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>GitHub URL</label>
        <input
          type="url"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.group}>
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} style={styles.select}>
          <option>Web</option>
          <option>Mobile</option>
          <option>Design</option>
          <option>Other</option>
        </select>
      </div>

      <div style={styles.group}>
        <label>Technologies</label>
        <div style={styles.techInput}>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            style={styles.input}
          />
          <button type="button" onClick={handleAddTech} style={styles.addBtn}>
            Add
          </button>
        </div>
        <div style={styles.techTags}>
          {formData.technologies.map((tech, idx) => (
            <span key={idx} style={styles.techTag}>
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTech(idx)}
                style={styles.removeBtn}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      <div style={styles.checkboxGroup}>
        <label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured
        </label>
      </div>

      <div style={styles.checkboxGroup}>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange} style={styles.select}>
            <option>published</option>
            <option>draft</option>
          </select>
        </label>
      </div>

      <button type="submit" style={styles.submitBtn}>
        {initialData ? 'Update Project' : 'Create Project'}
      </button>
      {initialData && onCancel && (
        <button type="button" onClick={onCancel} style={styles.cancelBtn}>
          Cancel
        </button>
      )}
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    maxWidth: '600px',
  },
  group: {
    marginBottom: '20px',
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
    transition: 'all 0.3s ease',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  techInput: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  addBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
  },
  techTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  techTag: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    color: '#06B6D4',
    padding: '8px 12px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid rgba(6, 182, 212, 0.3)',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '16px',
    padding: 0,
  },
  checkboxGroup: {
    marginBottom: '20px',
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
  },
  cancelBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};
