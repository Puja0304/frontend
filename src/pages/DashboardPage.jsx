import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const navigate = useNavigate();

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/transactions", {
          headers: {
            "x-auth-token": token,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Add a new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        {
          name: transactionName,
          amount: transactionAmount,
          type: transactionType,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setTransactions([...transactions, response.data]);
      setTransactionName("");
      setTransactionAmount("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Delete a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      // Remove the transaction from the local state
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <Header />
      <main className="dashboard-container">
        <h2>Dashboard</h2>

        {/* Summary Boxes */}
        <div className="summary-boxes">
          <div className="summary-box income-box">
            <h3>Total Income</h3>
            <p>${transactions
              .filter((t) => t.type === "income")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}</p>
          </div>
          <div className="summary-box expense-box">
            <h3>Total Expenses</h3>
            <p>${transactions
              .filter((t) => t.type === "expense")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}</p>
          </div>
          <div className="summary-box balance-box">
            <h3>Balance</h3>
            <p>${(
              transactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0) -
              transactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0)
            ).toFixed(2)}</p>
          </div>
        </div>

        {/* Add Transaction Form */}
        <form className="transaction-form" onSubmit={handleAddTransaction}>
          <div className="form-group">
            <label>Transaction Name:</label>
            <input
              type="text"
              value={transactionName}
              onChange={(e) => setTransactionName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Transaction
          </button>
        </form>

        {/* Transactions List */}
        <div className="transactions-list">
          <h3>Transactions</h3>
          {transactions.length === 0 ? (
            <p>No transactions added yet.</p>
          ) : (
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction._id}>
                  <span>{transaction.name}</span>
                  <span
                    className={
                      transaction.type === "income" ? "income" : "expense"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </span>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTransaction(transaction._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;