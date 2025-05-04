import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Form submission state
  const [submitted, setSubmitted] = useState(false);

  // Spring animation for section title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
    delay: 300
  });

  // Spring animation for form
  const formSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 200, friction: 20 },
    delay: 500
  });

  // Spring animation for text content
  const textSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 200, friction: 20 },
    delay: 400
  });

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="section active">
      <animated.h2 
        style={{
          ...titleSpring,
          marginBottom: '40px',
          color: 'var(--color-primary)'
        }}
      >
        CONTACT
      </animated.h2>
      
      <div className="contact-container">
        <animated.div 
          className="contact-info"
          style={textSpring}
        >
          <h3 className="contact-heading">Connect with AEGNTIC</h3>
          <p className="contact-text">
            Our quantum interface is continuously expanding across multiple information dimensions.
            Reach out to discuss integration possibilities, custom implementations, or to report
            unexpected reality distortions.
          </p>
          <p className="contact-text">
            The AEGNTIC system processes all communications through advanced neural filters,
            ensuring optimal response formulation based on your unique query patterns and conceptual frameworks.
          </p>
          <p className="contact-text">
            Response times vary based on quantum fluctuations and dimensional alignment.
            Priority channels are available for critical reality stabilization requests.
          </p>
        </animated.div>
        
        <animated.form 
          className="contact-form"
          onSubmit={handleSubmit}
          style={formSpring}
        >
          <div className="form-group">
            <input 
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder=" "
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="name" className="form-label">Your Name</label>
          </div>
          
          <div className="form-group">
            <input 
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder=" "
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email" className="form-label">Your Email</label>
          </div>
          
          <div className="form-group">
            <textarea 
              id="message"
              name="message"
              className="form-input"
              placeholder=" "
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <label htmlFor="message" className="form-label">Your Message</label>
          </div>
          
          <button 
            type="submit" 
            className="form-submit"
            disabled={submitted}
          >
            {submitted ? 'Message Sent' : 'Send Message'}
          </button>
        </animated.form>
      </div>
    </div>
  );
};

export default Contact;
