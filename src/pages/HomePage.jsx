import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

// const token = localStorage.getItem("token");

// const response = await axios.get("http://localhost:5173/api/transactions", {
//   headers: {
//     "x-auth-token": token,
//   },
// });

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-section">
        
          <div className="hero-content">
            <h1>Welcome to Personal Finance Manager</h1>
            <p>
              Take control of your finances with our easy-to-use tools. Track your
              income, expenses, and savings effortlessly.
            </p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-button">
                Login
              </Link>
              <Link to="/register" className="cta-button">
                Register
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Track Income & Expenses</h3>
              <p>
                Easily log and categorize your income and expenses to understand
                your spending habits.
              </p>
            </div>
            
            <div className="feature-card">
              <h3>Set Financial Goals</h3>
              <p>
                Plan for the future by setting and tracking your financial goals.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        

        {/* Call-to-Action Section */}
        <section className="cta-section">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Sign up today and start managing your money like a pro.</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button">
              Get Started
            </Link>
          </div>
        </section>
        
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;