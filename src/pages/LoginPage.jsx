import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with the provided email and password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Save the logged-in user in local storage
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/dashboard"); // Redirect to the dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <Header />
      <section className="hero-section">
      <main className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </main>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;