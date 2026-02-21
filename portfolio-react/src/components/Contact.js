import React from 'react';

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-description">
          Ready to collaborate or have questions about my work? I'd love to hear from you. Feel free to reach out for opportunities, 
          projects, or just to connect professionally.
        </p>
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Contact Information</h3>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>2300032055cseh1@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>Available upon request</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>Andhra Pradesh, India</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h4>Response Time</h4>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>
          <div className="contact-form-container">
            <form 
              className="contact-form" 
              action="mailto:2300032055cseh1@gmail.com" 
              method="post" 
              encType="text/plain"
            >
              <h3 className="contact-form-title">Send Message</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="your.email@company.com" />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company/Organization</label>
                <input type="text" id="company" name="company" placeholder="Your company name" />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position/Role</label>
                <input type="text" id="position" name="position" placeholder="Your job title" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select id="subject" name="subject" required defaultValue="">
                  <option value="" disabled>Select a subject</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Consultation">Consultation</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  placeholder="Tell me about your project, opportunity, or inquiry..." 
                  rows="5"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="timeline">Expected Timeline</label>
                <select id="timeline" name="timeline" defaultValue="">
                  <option value="" disabled>Select timeline</option>
                  <option value="Immediate">Immediate (within 1 week)</option>
                  <option value="Short-term">Short-term (1-4 weeks)</option>
                  <option value="Medium-term">Medium-term (1-3 months)</option>
                  <option value="Long-term">Long-term (3+ months)</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary contact-submit">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
