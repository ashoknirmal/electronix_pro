import React, { useState } from "react";
import emailjs from "emailjs-com";
import axios from "axios";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending Email via Email.js
    emailjs
      .send(
        "service_0g160li", // Replace with your Email.js service ID
        "template_zco16pd", // Replace with your Email.js template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email1: "ashok.p.s.0001@gmail.com",
          to_email2: "pcmuthuvel@gmail.com",
        },
        "0gwFnzWj72dyxBglO" // Replace with your Email.js Public Key
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert("Email Sent Successfully!");
      })
      .catch((err) => {
        console.error("Error sending email:", err);
      });

    // Sending SMS via Backend API
    try {
      await axios.post("http://localhost:5000/send-sms", {
        message: `New message from ${formData.name}: ${formData.message}`,
        phone: "6383297756",
      });
      alert("SMS Sent Successfully!");
    } catch (error) {
      console.error("Error sending SMS:", error);
    }

    // Reset Form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us with any questions or feedback.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="textarea"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">Send</button>
      </form>

      <div className="map-container">
        <h2>Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d11255.396057509528!2d77.21423326847287!3d10.577178426230889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sVIJAYAGIRI%20NAGAR%205%2F52B%20KANAKKAMPALAYAM%20VILLAGE%20UDUMALPET%20Tamil%20Nadu!5e1!3m2!1sen!2sin!4v1738817075161!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </div>
    </div>
  );
}
