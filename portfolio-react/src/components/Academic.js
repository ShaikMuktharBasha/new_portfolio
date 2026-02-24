import React, { memo } from 'react';

const Academic = memo(function Academic() {
  return (
    <section className="section academic-section">
      <div className="container">
        <h2 className="section-title">Academic Journey</h2>
        <div className="academic-timeline">
          <div className="timeline-item">
            <div className="timeline-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="timeline-content">
              <h3 className="timeline-title">Class X: Sri Chaitanya School</h3>
              <p className="timeline-description">
                Foundational education that laid the groundwork for academic excellence and future learning endeavors at this esteemed institution.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="timeline-content">
              <h3 className="timeline-title">Class XII: Sri Chaitanya Junior College (2021-2023)</h3>
              <p className="timeline-description">
                Achieved 821 Marks in intermediate education, bridging high school to higher education.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="timeline-content">
              <h3 className="timeline-title">B.Tech CSE: KL University (2023-2027)</h3>
              <p className="timeline-description">
                Maintaining a stellar 8.89 CGPA in ongoing Computer Science &amp; Engineering program, demonstrating consistent excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Academic;
