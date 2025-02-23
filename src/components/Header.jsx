import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Adjust the path to your logo

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src={logo} alt="Personal Finance Manager Logo" className="logo" />
        <h1>Personal Finance Manager</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;