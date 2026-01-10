import React from 'react';
import { ProjectList } from '../components/projects/ProjectList';

export const Projects = () => {
  return (
    <div>
      <h1 style={styles.title}>My Projects</h1>
      <ProjectList />
    </div>
  );
};

const styles = {
  title: {
    textAlign: 'center',
    padding: '40px 20px',
    marginBottom: 0,
  },
};
