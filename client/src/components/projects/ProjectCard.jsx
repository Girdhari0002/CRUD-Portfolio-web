import React from 'react';

export const ProjectCard = ({ project }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} style={styles.image} />
        ) : (
          <div style={styles.noImage}>No Image</div>
        )}
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.description}>
          {project.description.substring(0, 100)}...
        </p>
        <div style={styles.technologies}>
          {project.technologies.map((tech, idx) => (
            <span key={idx} style={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
        <div style={styles.footer}>
          <p style={styles.category}>{project.category}</p>
          {project.featured && <span style={styles.badge}>Featured</span>}
        </div>
        <div style={styles.links}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    color: '#999',
  },
  content: {
    padding: '20px',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px',
  },
  technologies: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginBottom: '10px',
  },
  tag: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    color: '#06B6D4',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    border: '1px solid rgba(6, 182, 212, 0.3)',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  category: {
    fontSize: '12px',
    color: '#A855F7',
    margin: 0,
    fontWeight: '600',
  },
  badge: {
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '10px',
  },
  link: {
    color: '#06B6D4',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
};
