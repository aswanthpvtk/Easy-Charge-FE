import React from 'react';
import './Footer.css'; // Make sure to import your CSS file

function Footer() {
  return (
    
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Landing Page</a>
          <a href="/home">Home Page</a>
        </div>

     
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons ">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook me-3"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram me-3"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter me-3"></i>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>

        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
    
    
  );
}

export default Footer;
