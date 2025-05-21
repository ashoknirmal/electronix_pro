import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles/Auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful, Please Login");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode the credential to get user info
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, sub: googleId } = decoded;
      
      // Send to backend
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, googleId }),
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Google Signup Successful");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Google Signup Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      
      <div className="google-auth-container">
        <p>OR</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Signup Failed")}
          useOneTap
        />
      </div>
      
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}