import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token); // Save token in local storage
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <Header />
      <section className="hero-section">
      <main className="register-container">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </main>
      </section>
      <Footer />
    </div>
  );
};

export default RegisterPage;