import api from './api';

export const projectService = {
  getAllProjects: async (page = 1, limit = 10) => {
    const response = await api.get('/projects', {
      params: { page, limit },
    });
    return response.data;
  },

  getFeaturedProjects: async () => {
    const response = await api.get('/projects/featured');
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  toggleFeatured: async (id) => {
    const response = await api.patch(`/projects/${id}/feature`);
    return response.data;
  },
};
