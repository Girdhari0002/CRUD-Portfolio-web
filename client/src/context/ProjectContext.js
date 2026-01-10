import { createContext, useState, useCallback } from 'react';
import { projectService } from '../services/projectService';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectService.getAllProjects(page, limit);
      setProjects(response.data);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch projects';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (projectData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectService.createProject(projectData);
      setProjects([response.data, ...projects]);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create project';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projects]);

  const updateProject = useCallback(
    async (id, projectData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await projectService.updateProject(id, projectData);
        setProjects(
          projects.map((p) => (p._id === id ? response.data : p))
        );
        return response;
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to update project';
        setError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [projects]
  );

  const deleteProject = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await projectService.deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id));
        return response;
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to delete project';
        setError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [projects]
  );

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
