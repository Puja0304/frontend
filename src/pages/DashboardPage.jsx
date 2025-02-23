import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("income");

  // Add a new transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!transactionName || !transactionAmount) return;

    const newTransaction = {
      id: Date.now(),
      name: transactionName,
      amount: parseFloat(transactionAmount),
      type: transactionType,
    };

    setTransactions([...transactions, newTransaction]);
    setTransactionName("");
    setTransactionAmount("");
  };

  // Delete a transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  // Calculate total income, expenses, and balance
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="dashboard-page">
      <Header />
      <main className="dashboard-container">
      
        <h2>Dashboard</h2>

        {/* Summary Boxes */}
        <div className="summary-boxes">
          <div className="summary-box income-box">
            <h3>Total Income</h3>
            <p>${totalIncome.toFixed(2)}</p>
          </div>
          <div className="summary-box expense-box">
            <h3>Total Expenses</h3>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="summary-box balance-box">
            <h3>Balance</h3>
            <p>${balance.toFixed(2)}</p>
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
                <li key={transaction.id}>
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
                    onClick={() => handleDeleteTransaction(transaction.id)}
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