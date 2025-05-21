import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productType, setProductType] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("productType", productType);
    formData.append("videoLink", videoLink);

    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("Product added successfully!");

      // Clear form
      setImage(null);
      setName("");
      setDescription("");
      setPrice("");
      setDiscountPrice("");
      setStock("");
      setProductType("");
      setVideoLink("");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Add Product</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required /><br />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required /><br />
      <input type="number" placeholder="Discount Price" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} /><br />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} /><br />
      <input type="text" placeholder="Product Type" value={productType} onChange={(e) => setProductType(e.target.value)} /><br />
      <input type="text" placeholder="Video Link" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} /><br />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
