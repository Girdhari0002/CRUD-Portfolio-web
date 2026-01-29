import React, { useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/projects/ProjectCard';
import { authService } from '../services/authService';

export const Home = () => {
  const { projects, fetchProjects } = useProjects();

  const [profileName, setProfileName] = React.useState('Girdhari Singh Yadav');

  useEffect(() => {
    fetchProjects();

    const fetchProfile = async () => {
      try {
        const data = await authService.getAdminProfile();
        if (data.profile?.name) {
          setProfileName(data.profile.name);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();

    // Listen for profile updates
    const handleUpdate = () => fetchProfile();
    window.addEventListener('profileUpdated', handleUpdate);
    return () => window.removeEventListener('profileUpdated', handleUpdate);
  }, [fetchProjects]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1>{profileName}</h1>
          <p style={styles.subtitle}>Full Stack Web Developer | MERN Stack | DSA Enthusiast</p>
          <p style={styles.description}>
            Building scalable, responsive, and user-centric web applications with modern technologies.
            Passionate about solving complex problems and delivering high-quality solutions.
          </p>
          <a href="/projects" style={styles.ctaButton}>
            View My Work
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={styles.section} id="projects">
        <div style={styles.container}>
          <h2>Featured Projects</h2>
          <div style={styles.grid}>
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            ) : (
              <p style={styles.emptyState}>No featured projects yet. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.section} id="about">
        <div style={styles.container}>
          <h2>About Me</h2>
          <div style={styles.aboutContent}>
            <p>
              I'm a B.Tech IT student and passionate full-stack web developer dedicated to building scalable, responsive, and user-centric web applications. With a strong foundation in Data Structures & Algorithms and practical MERN Stack experience, I excel at solving complex problems and delivering high-quality solutions.
            </p>
            <div style={styles.highlights}>
              <div style={styles.highlight}>
                <h4>🎓 Education</h4>
                <p>B.Tech in Information Technology from C.C.S. University, Meerut</p>
              </div>
              <div style={styles.highlight}>
                <h4>🏆 Achievements</h4>
                <p>Winner of Internal Hackathon 2025 & Active LeetCode Practitioner</p>
              </div>
              <div style={styles.highlight}>
                <h4>💡 Focus</h4>
                <p>Full-stack development, system design, and algorithmic problem-solving</p>
              </div>
            </div>
            <a href="/about" style={styles.readMore}>Learn More About Me →</a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={styles.skillsSection} id="skills">
        <div style={styles.container}>
          <h2>Technical Skills</h2>
          <div style={styles.skillsGrid}>
            <div style={styles.skillCard}>
              <h3>Frontend</h3>
              <p>React.js, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Bootstrap</p>
            </div>
            <div style={styles.skillCard}>
              <h3>Backend</h3>
              <p>Node.js, Express.js, RESTful APIs, JWT, Authentication</p>
            </div>
            <div style={styles.skillCard}>
              <h3>Database</h3>
              <p>MongoDB, Mongoose ODM, MySQL, Query Optimization</p>
            </div>
            <div style={styles.skillCard}>
              <h3>Tools</h3>
              <p>Git, GitHub, Postman, VS Code, Vercel, Netlify</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    color: 'white',
    padding: '120px 20px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  subtitle: {
    fontSize: '24px',
    color: '#06B6D4',
    fontWeight: '600',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.8',
    maxWidth: '600px',
    margin: '0 auto 30px',
    color: '#d1d5db',
  },
  ctaButton: {
    display: 'inline-block',
    marginTop: '20px',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
  },
  section: {
    padding: '60px 20px',
    borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
    backgroundColor: '#f8fafc',
  },
  skillsSection: {
    padding: '60px 20px',
    backgroundColor: 'white',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  emptyState: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#999',
    gridColumn: '1 / -1',
    padding: '40px',
  },
  aboutContent: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#333',
    marginTop: '20px',
  },
  highlights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px',
    marginBottom: '30px',
  },
  highlight: {
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid rgba(6, 182, 212, 0.2)',
  },
  readMore: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#06B6D4',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  },
  skillCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.1)',
    transition: 'all 0.3s ease',
  },
};
