import React from 'react';

function Skills() {
  return (
    <section className="section skills-section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3 className="skill-category-title">Programming Languages</h3>
            <ul className="skill-list">
              <li><i className="fas fa-check"></i> C</li>
              <li><i className="fas fa-check"></i> Python</li>
              <li><i className="fas fa-check"></i> Java</li>
            </ul>   
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">Web Development</h3>
            <ul className="skill-list">
              <li><i className="fas fa-check"></i> React.js</li>
              <li><i className="fas fa-check"></i> Django</li>
              <li><i className="fas fa-check"></i> MERN Stack (MongoDB, Express.js, React.js, Node.js)</li>
              <li><i className="fas fa-check"></i> JSP, Hibernate</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">Databases &amp; Tools</h3>
            <ul className="skill-list">
              <li><i className="fas fa-check"></i> MySql</li>
              <li><i className="fas fa-check"></i> MongoDB</li>
              <li><i className="fas fa-check"></i> Git, GitHub</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">Problem Solving</h3>
            <ul className="skill-list">
              <li><i className="fas fa-check"></i> Competitive coding (HackerRank, CodeChef)</li>
              <li><i className="fas fa-check"></i> Data Structures &amp; Algorithms</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
