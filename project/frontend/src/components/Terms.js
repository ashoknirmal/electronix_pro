import React from "react";
import "../styles/Terms.css"; // Import CSS for styling

const Terms = () => {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Kavya Traders. By using our services, you agree to abide by these Terms & Conditions. 
          If you do not agree with any part of these terms, you may discontinue using our platform.
        </p>
      </section>

      <section>
        <h2>2. User Responsibilities</h2>
        <p>
          Users must provide accurate details while creating an account. Any misuse, fraudulent activity, or 
          violation of policies will result in account suspension.
        </p>
      </section>

      <section>
        <h2>3. Orders & Payments</h2>
        <p>
          All orders are confirmed based on availability. Payments are processed securely through our platform. 
          In case of fraudulent transactions, Kavya Traders holds the right to cancel or block such orders.
        </p>
      </section>

      <section>
        <h2>4. Refunds & Cancellations</h2>
        <p>
          - Orders can be canceled within 10 minutes of placement.  
          - Refunds will be processed within 5-7 business days.  
          - If an item is damaged or incorrect, users must report the issue within 24 hours.  
        </p>
      </section>

      <section>
        <h2>5. Privacy Policy</h2>
        <p>
          We respect your privacy and ensure data protection. User data will be stored securely 
          and will not be shared with third parties without consent.
        </p>
      </section>

      <section>
        <h2>6. Dispute Resolution</h2>
        <p>
          Any disputes arising shall be governed by the laws of India. If necessary, legal action will be taken 
          in the jurisdiction of Telangana courts.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          Kavya Traders shall not be held liable for any indirect or accidental damages arising from the use of our services.
        </p>
      </section>

      <p className="last-updated">Last Updated: {new Date().toDateString()}</p>
    </div>
  );
};

export default Terms;
