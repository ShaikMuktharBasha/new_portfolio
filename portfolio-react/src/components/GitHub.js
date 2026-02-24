import React, { memo } from 'react';

const GitHub = memo(function GitHub() {
  return (
    <section className="section github-section">
      <div className="container">
        <h2 className="section-title">GitHub Profile</h2>
        <p className="section-description">
          Explore a diverse range of projects, contributions, and code samples on my GitHub profile. This showcases my coding 
          proficiency, collaborative efforts, and project coordination skills.
        </p>
        <div className="github-link">
          <a 
            href="https://github.com/ShaikMuktharBasha" 
            className="btn btn-primary" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i> Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
});

export default GitHub;
