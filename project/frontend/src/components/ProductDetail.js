// src/components/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const productData = response.data;
        setProduct(productData);
        setReviews(productData.reviews || []);
        setMainImage(productData.images?.[0] || "https://via.placeholder.com/300");

        // Fetch all products to filter related ones
        const allProductsRes = await axios.get("http://localhost:5000/api/products");
        const filtered = allProductsRes.data.filter(
          (p) => p.productType === productData.productType && p._id !== productData._id
        );
        setRelatedProducts(filtered);
      } catch (error) {
        setError("Product details not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating((totalRating / reviews.length).toFixed(1));
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    try {
      const newReview = { rating, comment, user: "Guest" };
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, newReview);
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setRating(0);
      setComment("");
      alert("Review submitted successfully!");
    } catch (error) {
      alert("Failed to submit review.");
    }
  };

  const addToCart = async () => {
    try {
      const cartItem = {
        productId: product._id,
        quantity: 1,
      };
      await axios.post("http://localhost:5000/api/cart", cartItem);
      alert("Added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  const openMoreInfo = () => {
    product?.videoLink ? window.open(product.videoLink, "_blank") : alert("No video available.");
  };

  if (loading) {
    return (
      <div className="loading-bike">
        <div className="wheel left"></div>
        <div className="wheel right"></div>
        <div className="frame"></div>
      </div>
    );
  }

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="product-container">
      {product && (
        <>
          <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

          <div className="image-section">
            <img src={mainImage} alt={product.name} className="main-image" />
            <Swiper spaceBetween={10} slidesPerView={4} className="thumbnail-slider">
              {product.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${mainImage === img ? "active-thumbnail" : ""}`}
                    onClick={() => setMainImage(img)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="details-section">
            <h2>{product.name}</h2>
            <p className="product-price">${product.discountPrice || product.price}</p>
            <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            <h3>Product Description</h3>
            <p>{product.description}</p>
            <h3>Overall Rating: ⭐ {averageRating > 0 ? averageRating : "No ratings yet"}</h3>

            <div className="buttons">
              <button
                className="buy-btn"
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      product: {
                        id: product._id,
                        name: product.name,
                        price: product.discountPrice || product.price,
                      },
                    },
                  })
                }
              >
                🛒 Buy Now
              </button>
              <button className="cart-btn" onClick={addToCart}>➕ Add to Cart</button>
              <button className="info-btn" onClick={openMoreInfo}>📹 More Info</button>
            </div>
          </div>

          <div className="reviews-section">
            <h3>Customer Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review">
                  <p><strong>{review.user}</strong> ⭐ {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}

            <div className="review-form">
              <h3>Submit Your Review</h3>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={0}>Select Rating</option>
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>
              </select>
              <textarea
                placeholder="Write a review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button onClick={submitReview}>Submit</button>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="related-products">
              <h3>Related Products</h3>
              <Swiper spaceBetween={20} slidesPerView={3}>
                {relatedProducts.map((related) => (
                  <SwiperSlide key={related._id}>
                    <div
                      className="related-product-card"
                      onClick={() => navigate(`/product/${related._id}`)}
                    >
                      <img src={related.images?.[0] || "https://via.placeholder.com/200"} alt={related.name} />
                      <h4>{related.name}</h4>
                      <p>${related.discountPrice || related.price}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
