import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "../styles/Product.css";

// Dummy components (replace if modularized)
// Add this to the `Product.js` or wherever you have the Loading component

const Loading = () => {
  return (
    <div className="loading-bike">
        <div className="wheel left"></div>
        <div className="wheel right"></div>
        <div className="frame"></div>
      </div>
  );
};

const PriceTag = ({ regularPrice, discountedPrice }) => (
  <div className="text-xl">
    <span className="line-through text-gray-400 mr-2">${regularPrice}</span>
    <span className="text-green-600">${discountedPrice}</span>
  </div>
);
const FormattedPrice = ({ amount }) => <span>${amount.toFixed(2)}</span>;
const AddToCartBtn = ({ product, title }) => (
  <button className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-800 transition">{title}</button>
);

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const [productData, setProductData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await axios.get(`http://localhost:5000/api/products/${id}`);
          setProductData(res.data);
          setImgUrl(res.data.images[0]);
          setColor(res.data.colors?.[0]);
        } else {
          const res = await axios.get("http://localhost:5000/api/products");
          let updated = res.data;
          
          if (searchQuery) {
            updated = updated.filter(product =>
              product.name.toLowerCase().includes(searchQuery)
            );
          }

          setAllProducts(updated);
          setFilteredProducts(updated);

          const types = [...new Set(updated.map((p) => p.productType))];
          setProductTypes(types);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, searchQuery]);

  useEffect(() => {
    if (productData?._id) {
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      if (!viewed.includes(productData._id)) {
        viewed.unshift(productData._id);
        const limited = viewed.slice(0, 10); // Limit to 10 items
        localStorage.setItem("recentlyViewed", JSON.stringify(limited));
      }
    }
  }, [productData]);
  

  // Filtering logic
  useEffect(() => {
    let updated = [...allProducts];

    if (selectedCategories.length > 0) {
      updated = updated.filter((product) =>
        selectedCategories.includes(product.productType)
      );
    }

    if (maxPrice < 1000) {
      updated = updated.filter((product) => product.price <= maxPrice);
    }

    if (minRating > 0) {
      updated = updated.filter((product) => product.rating >= minRating);
    }

    if (inStock) {
      updated = updated.filter((product) => product.stock > 0);
    }

    setFilteredProducts(updated);
  }, [selectedCategories, maxPrice, minRating, inStock, allProducts]);

  const handleCategoryChange = (type) => {
    setSelectedCategories((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  if (loading) return <Loading />;

  // Individual Product Page
  if (id && productData) {
    return (
      <div className="product-details grid md:grid-cols-2 gap-10 p-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            {productData.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className={`w-20 h-20 object-cover cursor-pointer hover:opacity-100 duration-300 ${
                  img === imgUrl ? "border border-black" : "opacity-80"
                }`}
                onClick={() => setImgUrl(img)}
              />
            ))}
          </div>
          <img
            src={imgUrl}
            alt="main"
            className="w-full max-h-[500px] object-contain rounded"
          />
        </div>

        <div className="details flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{productData.name}</h2>
          <PriceTag
            regularPrice={productData.regularPrice}
            discountedPrice={productData.discountedPrice}
          />
          <div className="flex gap-2 items-center">
            {[...Array(5)].map((_, i) => (
              <MdOutlineStarOutline key={i} />
            ))}
            <span>({productData.reviews} reviews)</span>
          </div>
          <p className="text-gray-600 flex items-center">
            <FaRegEye className="mr-1" /> {productData.reviews} people are viewing now
          </p>
          <p>
            You are saving{" "}
            <span className="text-green-600 font-semibold">
              <FormattedPrice amount={productData.regularPrice - productData.discountedPrice} />
            </span>
          </p>
          {color && (
            <p>
              Color: <span className="font-bold capitalize" style={{ color }}>{color}</span>
            </p>
          )}
          <div className="flex gap-2 mt-2">
            {productData.colors?.map((col) => (
              <div
                key={col}
                onClick={() => setColor(col)}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  color === col ? "border-black" : "border-gray-200"
                }`}
                style={{ backgroundColor: col }}
              />
            ))}
            {color && (
              <button onClick={() => setColor("")} className="ml-2 flex items-center text-sm text-red-500">
                <IoClose /> Clear
              </button>
            )}
          </div>
          <p>Brand: <strong>{productData.brand}</strong></p>
          <p>Category: <strong>{productData.productType}</strong></p>
          <AddToCartBtn product={productData} title="Buy Now" />
        </div>
      </div>
    );
  }

  // Product Listing Page
  return (
    <div className="product-page grid md:grid-cols-[250px_1fr] gap-8 p-4">
      {/* Filters Sidebar */}
      <div className="filters bg-gray-100 p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-4">Filters</h3>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Category</h4>
          {productTypes.map((type) => (
            <label key={type} className="block mb-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(type)}
                onChange={() => handleCategoryChange(type)}
              />{" "}
              {type}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Max Price: ${maxPrice}</h4>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Minimum Rating</h4>
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="block">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
              />{" "}
              {rating} Stars & Up
            </label>
          ))}
        </div>
        <div>
          <h4 className="font-semibold">Availability</h4>
          <label>
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
            />{" "}
            In Stock Only
          </label>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {filteredProducts.length === 0 ? (
          <p>No products match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded hover:shadow-md transition"
              >
                <img
                  src={
                  product.images && product.images.length > 0
                  ? product.images[0]
                  : product.image || "fallback_url_if_any"
                }
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>${product.price}</p>
                <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="text-sm text-blue-600 underline mt-2"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
