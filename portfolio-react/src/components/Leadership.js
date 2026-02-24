import React from 'react';

function Leadership() {
  return (
    <section className="section leadership-section">
      <div className="container">
        <h2 className="section-title">Leadership &amp; Collaboration</h2>
        <div className="leadership-grid">
          <div className="leadership-card">
            <div className="card-icon">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <h3 className="card-title">Team Leadership</h3>
              <p className="card-description">Ability to delegate tasks, set goals, and monitor progress effectively.</p>
            </div>
          </div>
          <div className="leadership-card">
            <div className="card-icon">
              <i className="fas fa-comments"></i>
            </div>
            <div>
              <h3 className="card-title">Communication Skills</h3>
              <p className="card-description">Strong communication to facilitate seamless collaboration among team members.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Leadership;
