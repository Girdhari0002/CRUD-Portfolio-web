import React, { useState, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { ProjectForm } from '../../components/projects/ProjectForm';
import { AdminTable } from '../../components/admin/AdminTable';

export const ManageProjects = () => {
  const { projects, fetchProjects, createProject, updateProject, deleteProject } = useProjects();
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreate = async (formData) => {
    try {
      await createProject(formData);
      setMessage({ type: 'success', text: 'Project created successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateProject(editingId, formData);
      setEditingId(null);
      setMessage({ type: 'success', text: 'Project updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const editingProject = editingId ? projects.find((p) => p._id === editingId) : null;

  return (
    <div style={styles.container}>
      {message && (
        <div
          style={{
            ...styles.message,
            backgroundColor: message.type === 'success' ? '#e8f5e9' : '#ffebee',
            color: message.type === 'success' ? 'green' : 'red',
          }}
        >
          {message.text}
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.formSection}>
          <ProjectForm
            initialData={editingProject}
            onSubmit={editingProject ? handleUpdate : handleCreate}
            onCancel={() => setEditingId(null)}
          />
        </div>
        <div style={styles.tableSection}>
          <AdminTable
            projects={projects}
            onEdit={setEditingId}
            onDelete={handleDelete}
            onToggleFeatured={(id) => {
              const project = projects.find((p) => p._id === id);
              handleUpdate({ ...project, featured: !project.featured });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  formSection: {},
  tableSection: {},
  message: {
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
};
