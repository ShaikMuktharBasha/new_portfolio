import React, { useEffect } from 'react';

function Certifications() {
  useEffect(() => {
    // Load Credly embed script
    const script = document.createElement('script');
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="//cdn.credly.com/assets/utilities/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="section certifications-section">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid">
          <a 
            href="https://www.credly.com/earner/earned/badge/5ae720c5-f2a6-41d5-a00f-83fe086fb16f" 
            className="certification-badge" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="cert-logo">
              <img 
                src="/images/certifications/aviatrix-logo-png_seeklogo-456435.png" 
                alt="Aviatrix Logo" 
                className="cert-logo-img"
              />
            </div>
            <div className="cert-content">
              <h4>Multicloud Network Associate</h4>
              <p>Aviatrix</p>
            </div>
          </a>
          <a 
            href="https://www.credly.com/earner/earned/badge/19ca1f6c-c48b-44d3-b200-ca224d15a2f5" 
            className="certification-badge" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="cert-logo">
              <img 
                src="/images/certifications/mongodb-logo-png_seeklogo-273731.png" 
                alt="MongoDB Logo" 
                className="cert-logo-img"
              />
            </div>
            <div className="cert-content">
              <h4>MongoDB Associate Developer</h4>
              <p>MongoDB</p>
            </div>
          </a>
          <a 
            href="https://www.credly.com/badges/4648cce2-e639-4d9f-9e78-8fbf1032db5c/public_url" 
            className="certification-badge" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="cert-logo">
              <img 
                src="/images/certifications/download.jpeg" 
                alt="Red Hat Logo" 
                className="cert-logo-img"
              />
            </div>
            <div className="cert-content">
              <h4>Red Hat Learner</h4>
              <p>Red Hat</p>
            </div>
          </a>
          <div className="certification-badge">
            <div className="cert-logo">
              <img 
                src="/images/certifications/download.png" 
                alt="Salesforce Logo" 
                className="cert-logo-img"
              />
            </div>
            <div className="cert-content">
              <h4>Salesforce Certified AI Associate</h4>
              <p>Salesforce</p>
            </div>
          </div>
          <div className="certification-badge credly-embed">
            <div 
              data-iframe-width="150" 
              data-iframe-height="270" 
              data-share-badge-id="72bf40ff-5096-40de-ad77-96e7253f3563" 
              data-share-badge-host="https://www.credly.com"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
