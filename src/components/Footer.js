import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
  };

  return (
    <div id='footer'>
      <div className='footer-content'>
        <div className='location-map'>
          <h4>Our Location</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093486!2d144.95373531531636!3d-37.81627937975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727dbb50a5e4d6!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1633504819743!5m2!1sen!2sau"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>

        <div className='newsletter'>
          <h4>Subscribe to our Newsletter</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>

          <div className='social-icons'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'><FaFacebookF /></a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'><FaTwitter /></a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className='footer-links'>
        <a href='/privacy-policy'>Privacy Policy</a>
        <a href='/terms-of-service'>Terms of Service</a>
        <a href='/contact'>Contact Us</a>
      </div>

      <p>© 2024 Steady Hotel. All rights reserved.</p>
    </div>
  );
}

export default Footer;