import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setError("Email already registered");
    } else {
      // Add the new user to the list
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Redirect to the login page
      navigate("/login");
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