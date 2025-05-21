import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProduct.css"; // Import the CSS for styling and animations

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    stock: "",
    images: [""],
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
  console.log("Fetched product data:", data);
  const validImages = Array.isArray(data.images) ? data.images : [""];
  setProduct({
    ...data,
    images: validImages,
  });
})

      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setProduct((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("Product updated successfully");
        navigate("/admin/manage-products");
      } else {
        alert("Failed to update product.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Error updating product.");
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Discount Price:</label>
        <input
          type="number"
          name="discountPrice"
          value={product.discountPrice}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />

        <label>Images:</label>
        {product.images.map((img, index) => (
          <div key={index} className="image-input-wrapper fade-in">
            <input
              type="text"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Image URL"
            />
            {product.images.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeImageField(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addImageField}>
          Add Image
        </button>

        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
