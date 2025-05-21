import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Buy.css";

const Buy = () => {
  const { id } = useParams();

  return (
    <div className="buy-container">
      <h2>Checkout for Product ID: {id}</h2>
      <p>Payment functionality will be implemented here.</p>
    </div>
  );
};

export default Buy;
