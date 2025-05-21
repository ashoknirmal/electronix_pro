import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img src="hero-ai-image.jpg" alt="Kavya Traders" className="hero-image" />
        <h1>Welcome to Kavya Traders</h1>
        <p>
          At Kavya Traders, we are committed to delivering top-quality goods and
          services with dedication, integrity, and innovation. Our expertise in
          the industry allows us to cater to a wide range of customer needs.
        </p>
      </div>

      {/* Our Story, Vision & Mission */}
      <div className="our-story">
        <h2>Our Story</h2>
        <p>
          Established with a vision to revolutionize the trading industry, Kavya
          Traders has been providing exceptional products and services to
          customers across various sectors. Over the years, we have built a
          strong reputation based on trust, reliability, and customer
          satisfaction.
        </p>

        <h3>Our Vision</h3>
        <p>
          To be a leading name in the trading industry by ensuring high-quality
          goods and services, customer-centric solutions, and sustainable
          business practices.
        </p>

        <h3>Our Mission</h3>
        <p>
          Our mission is to continuously enhance our product offerings and
          service standards to meet the ever-changing demands of our customers.
          We strive to foster strong relationships, promote innovation, and
          deliver unparalleled value in every transaction.
        </p>
      </div>

      {/* What We Offer */}
      <div className="what-we-offer">
        <h2>What We Offer</h2>
        <p>
          Kavya Traders specializes in offering a diverse range of goods and
          services. Whether you are looking for high-quality products or expert
          solutions, we have you covered. Our offerings include:
        </p>
        <ul>
          <li>Reliable and premium-quality goods</li>
          <li>Comprehensive trade solutions</li>
          <li>Exceptional customer support</li>
          <li>Timely delivery and logistics services</li>
        </ul>
      </div>

      {/* Why Choose Us */}
      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <p>
          At Kavya Traders, customer satisfaction is our top priority. We take
          pride in providing unmatched quality, efficiency, and reliability in
          all our services. Our dedicated team ensures that every product meets
          the highest standards, and our customer-first approach makes us a
          preferred choice in the industry.
        </p>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <img src="https://creator.nightcafe.studio/jobs/FBq9iQ8dXyCgtcEZa5tE/FBq9iQ8dXyCgtcEZa5tE--1--tnj0x.jpg" alt="Ashok" className="testimonial-image" />
          <p>"Kavya Traders never fails to impress with their top-notch services!"</p>
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
          </div>
        </div>
        <div className="testimonial">
          <img src="https://i.pinimg.com/736x/62/e7/c6/62e7c66dbf1cd1c7dd743c82678de895.jpg" alt="Abarna" className="testimonial-image" />
          <p>"Highly professional team and outstanding quality!"</p>
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>
        <div className="testimonial">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeWAhSS3pAL5DxdR1_W6ySbYJhM8b1bhDYFE_yDsZADgbvJP-aHK2t6zDzn9DQmdhm5ks&usqp=CAU" alt="Harini" />
          <p>"Reliable, efficient, and always on time!"</p>
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
          </div>
        </div>
        <div className="testimonial">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCWS9wlQR7QKdSkYQMq6FE-TEnA7VAn_LWyOwS110GZOWfP-qxkYKNqnk_959hpA3cOc&usqp=CAU" alt="Divya" />
          <p>"The best trading service I have ever used!"</p>
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>
        <div className="testimonial">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrqC8R8NAwgGh360VOn97bmhD9iVZIt7sbo9Am8t8m5zv-nBXfTz_0UNxlkSvjZohwtm4&usqp=CAU" alt="Raju" />
          <p>"Excellent customer support and quality products!"</p>
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>
      </div>

      {/* Contact & Socials */}
      <div className="contact-socials">
  <h2>Contact Us</h2>
  <p>
    Email: <a href="mailto:pcmuthuvel@gmail.com">pcmuthuvel@gmail.com</a>
  </p>
  <p>
    Phone: <a href="tel:+917708802964">+91 7708802964</a>
  </p>
  <div className="social-icons">
    <a href="https://example.com">Facebook</a> | <a href="https://example.com">Twitter</a> | <a href="https://example.com">LinkedIn</a>
  </div>
</div>

    </div>
  );
};

export default About;
