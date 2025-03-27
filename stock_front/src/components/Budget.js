import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Budget.css";
import "../style/Theme.css";
import Navbar from "./Navbar";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    allocatedAmount: "",
    expenseCategory: "",
    description: "",
    amount: ""
  });

  useEffect(() => { fetchBudgets(); }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/budget/all");
      setBudgets(response.data);
    } catch (error) {
      toast.error("Error fetching budgets!");
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const addBudget = async () => {
    if (!formData.category || !formData.allocatedAmount) {
      toast.warn("Please enter category and amount!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/budget/add", {
        category: formData.category,
        allocatedAmount: parseFloat(formData.allocatedAmount),
      });
      toast.success("Budget added successfully!");
      setFormData({...formData, category: "", allocatedAmount: ""});
      fetchBudgets();
    } catch (error) {
      toast.error("Error adding budget!");
    }
  };

  const addExpense = async () => {
    if (!formData.expenseCategory || !formData.description || !formData.amount) {
      toast.warn("Please fill all fields!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/budget/addExpense/${formData.expenseCategory}`,
        {
          description: formData.description,
          amount: parseFloat(formData.amount),
        }
      );
      toast.success("Expense added successfully!");
      setFormData({...formData, description: "", amount: "", expenseCategory: ""});
      fetchBudgets();
    } catch (error) {
      toast.error("Error adding expense!");
    }
  };

  return (
    <div className="budget-page">
      <Navbar />
      <ToastContainer />
      <div className="container">
        <h1 className="page-title">Budget Management</h1><br></br>

        <div className="budget-actions">
          <div className="card">
            <h2>Add Budget</h2>
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              type="number"
              name="allocatedAmount"
              className="form-control"
              placeholder="Allocated Amount"
              value={formData.allocatedAmount}
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={addBudget}>Add Budget</button>
          </div>

          <div className="card">
            <h2>Add Expense</h2>
            <select 
              name="expenseCategory"
              className="form-control"
              value={formData.expenseCategory} 
              onChange={handleChange}
            >
              <option value="">Select Budget Category</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.category}>
                  {budget.category}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Expense Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={addExpense}>Add Expense</button>
          </div>
        </div>

        <div className="budget-list">
          <h2>Your Budgets</h2>
          {budgets.length === 0 ? (
            <p>No budgets added yet.</p>
          ) : (
            budgets.map((budget) => (
              <div key={budget.id} className="card budget-item">
                <div className="budget-header">
                  <h3>{budget.category}</h3>
                  <div className="budget-amounts">
                    <span>${(budget.allocatedAmount - budget.remainingAmount).toFixed(2)} / ${budget.allocatedAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${((budget.allocatedAmount - budget.remainingAmount) / budget.allocatedAmount) * 100}%`
                    }}
                  ></div>
                </div>

                <div className="expense-history">
                  <h4>Expense History</h4>
                  {budget.expenses.length === 0 ? (
                    <p>No expenses yet.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {budget.expenses.map((expense, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{expense.description}</td>
                            <td>${expense.amount.toFixed(2)}</td>
                            <td>{new Date(expense.dateTime).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Budget;