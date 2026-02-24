import React, { memo, useState } from 'react';

const Contact = memo(function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      // FormSubmit.co - Free, no registration needed
      const response = await fetch('https://formsubmit.co/ajax/2300032055cseh1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          position: formData.get('position'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          timeline: formData.get('timeline'),
          _subject: `Portfolio Contact: ${formData.get('subject')}`
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

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
              onSubmit={handleSubmit}
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
              <button 
                type="submit" 
                className="btn btn-primary contact-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                ) : (
                  <><i className="fas fa-paper-plane"></i> Send Message</>
                )}
              </button>
              {status === 'success' && (
                <p style={{ color: '#4ecdc4', marginTop: '1rem', textAlign: 'center' }}>
                  <i className="fas fa-check-circle"></i> Message sent successfully! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: '#ff6b6b', marginTop: '1rem', textAlign: 'center' }}>
                  <i className="fas fa-exclamation-circle"></i> Failed to send. Please try again or email directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
