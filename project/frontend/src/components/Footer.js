import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li> {/* Navigate to Terms page */}
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Support</h4>
          <p>Email: pcmuthuvel@gmail.com</p>
          <p>Phone: +91 7708802964</p>
          <p>Address: 123 Main Street, Warangal, Telangana</p>
        </div>
        <div className="footer-section">
          <h4>Payment Methods</h4>
          <p>Visa</p>
          <p>MasterCard</p>
          <p>PayPal</p>
          <p>UPI</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ashok Nirmal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
