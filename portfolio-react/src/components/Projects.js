import React, { memo } from 'react';

const Projects = memo(function Projects() {
  return (
    <section className="section projects-section">
      <div className="container">
        <h2 className="section-title">Key Projects</h2>
        <p className="section-description">
          As a passionate Full-Stack Developer, I excel in seamless integration and hands-on project work. My portfolio includes:
        </p>
        <div className="projects-list">
          <div className="project-item">
            <i className="fas fa-chart-line"></i>
            <span>Stock Exchange Management System (Django)</span>
          </div>
          <div className="project-item">
            <i className="fas fa-home"></i>
            <span>Real Estate Management System (MERN)</span>
          </div>
          <div className="project-item">
            <i className="fas fa-boxes"></i>
            <span>Material Management and Storage Accounting System (JSP)</span>
          </div>
          <div className="project-item">
            <i className="fas fa-calendar-alt"></i>
            <span>Event Management System (JSP with Hibernate)</span>
          </div>
          <div className="project-item">
            <i className="fas fa-newspaper"></i>
            <span>News Website, Library Management System, Weather App, Aniflow, Password Meter, ImgToText, IP Lookup, and Many More.</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Projects;
