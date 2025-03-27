import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStocks, addStock, refreshStockPrices } from "../api/stockApi";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "../style/Theme.css";
import "../style/Portfolio.css";

const Portfolio = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newStock, setNewStock] = useState({
    stockSymbol: "",
    quantity: "",
    purchasePrice: "",
  });

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const stocksData = await fetchStocks();
        setStocks(stocksData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadStocks();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const updatedStocks = await refreshStockPrices();
      setStocks(updatedStocks);
      toast.success("Prices refreshed successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedStock = await addStock({
        stockSymbol: newStock.stockSymbol.toUpperCase(),
        quantity: parseInt(newStock.quantity, 10),
        purchasePrice: parseFloat(newStock.purchasePrice),
      });
      setStocks([...stocks, addedStock]);
      setShowForm(false);
      setNewStock({ stockSymbol: "", quantity: "", purchasePrice: "" });
      toast.success("Stock added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="portfolio-page">
      <Navbar />
      <div className="container">
        <div className="portfolio-header">
          <h1 className="page-title">My Portfolio</h1>
          <div className="portfolio-actions">
            <button 
              className="btn btn-secondary"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Refresh Prices"}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowForm(true)}
            >
              Add Stock
            </button>
            <button 
              className="btn btn-success"
              onClick={() => navigate("/companiescatalog")}
            >
              Buy Stocks
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading portfolio...</div>
        ) : stocks.length === 0 ? (
          <div className="empty-portfolio">
            <p>Your portfolio is empty</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add Your First Stock
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Avg Cost</th>
                  <th>Current Price</th>
                  <th>Invested</th>
                  <th>Current Value</th>
                  <th>Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, index) => {
                  const invested = stock.quantity * stock.purchasePrice;
                  const currentValue = stock.quantity * stock.currentPrice;
                  const gainLoss = currentValue - invested;
                  const gainLossPercent = (gainLoss / invested) * 100;

                  return (
                    <tr key={index}>
                      <td>{stock.stockSymbol}</td>
                      <td>{stock.quantity}</td>
                      <td>${stock.purchasePrice.toFixed(2)}</td>
                      <td>${stock.currentPrice.toFixed(2)}</td>
                      <td>${invested.toFixed(2)}</td>
                      <td>${currentValue.toFixed(2)}</td>
                      <td style={{ color: gainLoss >= 0 ? 'var(--success)' : 'var(--error)' }}>
                        ${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add New Stock</h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="stockSymbol" 
                  className="form-control"
                  placeholder="Stock Symbol" 
                  value={newStock.stockSymbol} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="number" 
                  name="quantity" 
                  className="form-control"
                  placeholder="Quantity" 
                  value={newStock.quantity} 
                  onChange={handleChange} 
                  required 
                  min="1"
                />
                <input 
                  type="number" 
                  name="purchasePrice" 
                  className="form-control"
                  placeholder="Purchase Price" 
                  value={newStock.purchasePrice} 
                  onChange={handleChange} 
                  required 
                  min="0.01"
                  step="0.01"
                />
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Add Stock</button>
                  <button 
                    type="button" 
                    className="btn btn-error"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;