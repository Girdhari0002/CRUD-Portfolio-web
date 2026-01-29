import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const About = () => {
  const technicalSkills = {
    'Languages': ['C', 'C++', 'Java', 'Python', 'JavaScript'],
    'Frontend': ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Bootstrap', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication'],
    'Database': ['MongoDB', 'Mongoose ODM', 'MySQL'],
    'Tools & Platforms': ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel', 'Netlify']
  };

  const achievements = [
    { title: 'Winner – Internal Hackathon 2025', description: 'Successfully developed a full-stack application addressing real-world problems' },
    { title: 'Active LeetCode Practitioner', description: 'Consistently solving algorithmic problems and building strong DSA foundation' },
    { title: 'Tech Community Leader', description: <><a href="https://codescriet.dev/" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4', textDecoration: 'none', fontWeight: '600' }}>CODE.SCRIET</a> Member - Mentoring junior students in DSA and Web Development</> }
  ];

  const [profileName, setProfileName] = useState('Girdhari Singh Yadav');

  useEffect(() => {
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

    const handleUpdate = () => fetchProfile();
    window.addEventListener('profileUpdated', handleUpdate);
    return () => window.removeEventListener('profileUpdated', handleUpdate);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>{profileName}</h1>
        <p style={styles.heroSubtitle}>Full Stack Web Developer | MERN Stack | DSA Enthusiast</p>
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Professional Summary</h2>
        <p style={styles.text}>
          I'm a B.Tech IT student and passionate full-stack web developer dedicated to building scalable, responsive, and user-centric web applications. With a strong foundation in Data Structures & Algorithms and practical MERN Stack experience, I excel at solving complex problems and delivering high-quality solutions.
        </p>
        <p style={styles.text}>
          As an active hackathon participant and LeetCode enthusiast, I believe in clean code, teamwork, and continuous learning. I'm committed to building production-grade applications and advancing my expertise in system design and architecture.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Me</h2>
        <p style={styles.text}>
          Currently pursuing <strong>B.Tech in Information Technology</strong> from <strong>C.C.S. University, Meerut</strong>, I have developed a strong foundation in competitive programming and hands-on MERN Stack experience. I've successfully created multiple full-stack applications and contributed to technical community development.
        </p>
        <div style={styles.highlights}>
          <div style={styles.highlight}>
            <h4>📍 Location</h4>
            <p>Meerut, Uttar Pradesh, India</p>
          </div>
          <div style={styles.highlight}>
            <h4>🎓 Education</h4>
            <p>B.Tech in Information Technology</p>
          </div>
          <div style={styles.highlight}>
            <h4>💼 Current Role</h4>
            <p>Full Stack Developer & Tech Community Member</p>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Technical Skills</h2>
        {Object.entries(technicalSkills).map(([category, skills]) => (
          <div key={category} style={styles.skillCategory}>
            <h3 style={styles.categoryTitle}>{category}</h3>
            <div style={styles.skills}>
              {skills.map((skill) => (
                <span key={skill} style={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Key Achievements</h2>
        <div style={styles.achievementsList}>
          {achievements.map((achievement, idx) => (
            <div key={idx} style={styles.achievementCard}>
              <h3 style={styles.achievementTitle}>🏆 {achievement.title}</h3>
              <p style={styles.achievementDesc}>{achievement.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Core Values</h2>
        <div style={styles.valuesList}>
          <div style={styles.valueItem}>
            <strong>Clean Code</strong> - Readable, maintainable, and well-documented code
          </div>
          <div style={styles.valueItem}>
            <strong>Continuous Improvement</strong> - Regular skill enhancement and staying updated with industry trends
          </div>
          <div style={styles.valueItem}>
            <strong>Collaboration</strong> - Teamwork, knowledge sharing, and mentoring
          </div>
          <div style={styles.valueItem}>
            <strong>User-Centric Design</strong> - Always considering end-user experience and needs
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
    paddingBottom: '40px',
    borderBottom: '2px solid rgba(168, 85, 247, 0.2)',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#A855F7',
    fontWeight: '600',
  },
  section: {
    marginBottom: '50px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#0f172a',
    borderBottom: '3px solid #06B6D4',
    paddingBottom: '10px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '15px',
  },
  highlights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  highlight: {
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid rgba(6, 182, 212, 0.2)',
  },
  skillCategory: {
    marginBottom: '30px',
  },
  categoryTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#06B6D4',
    marginBottom: '12px',
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  skill: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    color: '#06B6D4',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    transition: 'all 0.3s ease',
  },
  achievementsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  achievementCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid rgba(168, 85, 247, 0.2)',
    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.1)',
  },
  achievementTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: '10px',
  },
  achievementDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
  },
  valuesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '20px',
  },
  valueItem: {
    backgroundColor: 'rgba(168, 85, 247, 0.05)',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.6',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
};
