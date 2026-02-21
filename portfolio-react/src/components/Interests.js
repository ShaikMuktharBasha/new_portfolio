import React from 'react';

function Interests() {
  return (
    <section className="section interests-section">
      <div className="container">
        <h2 className="section-title">Interests &amp; Activities</h2>
        <div className="interests-grid">
          <div className="interest-category">
            <h3 className="interest-title">Hobbies</h3>
            <ul className="interest-list">
              <li><i className="fas fa-play"></i> Watching Anime</li>
              <li><i className="fas fa-gamepad"></i> Playing Online Games</li>
              <li><i className="fas fa-book"></i> Reading Anime Manga (since 2021)</li>
            </ul>
          </div>
          <div className="interest-category">
            <h3 className="interest-title">Activities</h3>
            <ul className="interest-list">
              <li><i className="fas fa-laptop-code"></i> Developing Full Stack Projects</li>
              <li><i className="fas fa-baseball-ball"></i> Playing Cricket (since 2016)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Interests;
