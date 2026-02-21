import React from 'react';

function Proficiency() {
  return (
    <section className="section proficiency-section">
      <div className="container">
        <h2 className="section-title">Technical Proficiency</h2>
        <div className="proficiency-grid">
          <div className="proficiency-card">
            <div className="card-icon">
              <i className="fas fa-code"></i>
            </div>
            <h3 className="card-title">Programming Languages</h3>
            <p className="card-description">Strong skills in C, Java, and Python.</p>
          </div>
          <div className="proficiency-card">
            <div className="card-icon">
              <i className="fas fa-layer-group"></i>
            </div>
            <h3 className="card-title">Full Stack Web Development</h3>
            <p className="card-description">Proficiency in React.js for robust web applications.</p>
          </div>
          <div className="proficiency-card">
            <div className="card-icon">
              <i className="fas fa-desktop"></i>
            </div>
            <h3 className="card-title">Front-End Development</h3>
            <p className="card-description">Competence in creating user-friendly interfaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Proficiency;
