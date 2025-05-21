import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AdminDashboard from './admin/AdminDashboard';
import ManageUsers from './admin/ManageUsers';
import ManageProducts from './admin/ManageProducts';
import ManageOrders from './admin/ManageOrders';
import EditProduct from "./admin/EditProduct";
import AddProduct from "./admin/AddProduct";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Terms from "./components/Terms";
import FAQs from "./components/FAQs";
import Buy from "./components/Buy";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="971189610191-dhq5c5ba5goeq6bsk71vfh5j93giea7g.apps.googleusercontent.com">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buy/:id" element={<Buy />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/admin/add-product" element={<AddProduct />} />

          </Routes>
        </div>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
