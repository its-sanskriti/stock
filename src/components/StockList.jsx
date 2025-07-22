import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import stockData from "./data/stockData.json"; // Adjust path if stored elsewhere

const StocksList = () => {
  const [stocks, setStocks] = useState([]);
  const [exchange, setExchange] = useState("BSE");
  const [searchTicker, setSearchTicker] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setStocks(stockData[exchange] || []);
      setIsLoading(false);
    }, 500); // 0.5 sec delay
  }, [exchange]);

  const handleSearch = () => {
    if (searchTicker.trim()) {
      navigate(`/stock/${searchTicker.trim()}`);
    }
  };

  return (
    <div className="stocks-list">
      <h1>Stocks List</h1>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Enter stock ticker"
          value={searchTicker}
          onChange={(e) => setSearchTicker(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Exchange Buttons */}
      <div className="exchange-buttons">
        <button onClick={() => setExchange("BSE")}>BSE</button>
        <button onClick={() => setExchange("NSE")}>NSE</button>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <ClipLoader color="#36d7b7" size={50} />
          <p>please wait while Loading...</p>
          <p>It takes less than a minute</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/stock/${stock.symbol}`)}
                >
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StocksList;
