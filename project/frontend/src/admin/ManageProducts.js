import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      alert("Error deleting product.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleBack = () => {
    navigate(-1); // Go back one page
  };

  return (
    <div className="manage-products-container">
      <div className="header">
        <h2>Manage Products</h2>
        <button className="back-button" onClick={handleBack}>
          ⬅ Back
        </button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount Price</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.images && product.images.length > 1 ? (
                    <img src={product.images[0]} alt="Product" width="50" height="50" />
                    // <img src={product.images} alt="Product" width="50" height="50" />
                  ) : (
                    <img src={product.images}
                    alt={product.name}
                    style={{ width: "50px" }}
                    />
                  )}
                </td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>₹{product.discountPrice}</td>
                <td>{product.description}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEdit(product._id)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
