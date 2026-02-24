import React, { memo } from 'react';

const LinkedIn = memo(function LinkedIn() {
  return (
    <section className="section linkedin-section">
      <div className="container">
        <h2 className="section-title">LinkedIn Presence</h2>
        <p className="section-description">
          My LinkedIn profile highlights work experience, skills, and endorsements. Connect with industry professionals, 
          join relevant groups, and stay updated on industry trends.
        </p>
        <div className="linkedin-link">
          <a 
            href="https://www.linkedin.com/in/shaik-mukthar-basha-581847325/" 
            className="btn btn-primary" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i> Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
});

export default LinkedIn;
