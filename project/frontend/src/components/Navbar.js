import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);

  // Initial check for user authentication
  const checkAuth = () => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  };

  useEffect(() => {
    checkAuth();

    // Listen to localStorage changes in other tabs or same tab
    function handleStorageChange(event) {
      if (event.key === "user") {
        checkAuth();
      }
    }
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check auth state each time dropdown opens to sync immediately
  useEffect(() => {
    if (dropdownOpen) {
      checkAuth();
    }
  }, [dropdownOpen]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/product" className="nav-link">Product</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>

      <div className="nav-right">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
        </Link>

        <div className="auth-icons" ref={dropdownRef}>
          <FaUser
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="user-icon"
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="dropdown-item">Cart</Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="dropdown-item">Login</Link>
                  <Link to="/signup" className="dropdown-item">Signup</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
