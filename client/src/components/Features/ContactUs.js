import React, { useState } from 'react';
import './ContactUs.css';
import Maps from '../Places/Maps';
import api from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/admin_activity/contactus', formData);
      alert('Message sent successfully!');
      setFormData({
        user_name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      alert('Something went wrong: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contactUs-main-container">
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="contactUs-container">
          <div className="form-contactUs-container">
            <h2>Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="user_name">Your Name</label>
                <input
                  type="text"
                  id="user_name"
                  placeholder="Enter your name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="contactUs-submit-button">Send Message</button>
            </form>
          </div>
          <div className="map-contactUs-container">
            <Maps />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
