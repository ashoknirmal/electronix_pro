import React from "react";
import "../styles/FAQs.css"; // Add styles for better UI

const FAQs = () => {
  return (
    <div className="faqs-container">
      <h1>Frequently Asked Questions (FAQs)</h1>

      <div className="faq">
        <h2>1. How can I place an order?</h2>
        <p>You can browse our products, add them to the cart, and proceed to checkout for payment.</p>
      </div>

      <div className="faq">
        <h2>2. What payment methods do you accept?</h2>
        <p>We accept Visa, MasterCard, PayPal, and UPI transactions.</p>
      </div>

      <div className="faq">
        <h2>3. How do I cancel an order?</h2>
        <p>Orders can be canceled within 10 minutes of placement by visiting your order history.</p>
      </div>

      <div className="faq">
        <h2>4. What is the refund policy?</h2>
        <p>Refunds will be processed within 5-7 business days after approval.</p>
      </div>

      <div className="faq">
        <h2>5. Do you offer customer support?</h2>
        <p>Yes! You can contact us at <strong>pcmuthuvel@gmail.com</strong> or call <strong>+123 456 7890</strong>.</p>
      </div>

      <p className="last-updated">Last Updated: {new Date().toDateString()}</p>
    </div>
  );
};

export default FAQs;
