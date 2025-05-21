import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = async (e) => {
    e.preventDefault();

    // Admin hardcoded login check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin"
      };
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("user", JSON.stringify(adminUser));
      alert("Admin Login Successful");
      navigate("/admin/dashboard");
      return;
    }

    // Normal user login flow
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful");
        navigate("/");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Error");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, sub: googleId } = decoded;

      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, googleId }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Google Login Successful");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google Login Error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="google-auth-container">
        <p>OR</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Login Failed")}
          useOneTap
        />
      </div>

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
