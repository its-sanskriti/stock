import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

const StocksList = () => {
  const [stocks, setStocks] = useState([]);
  const [exchange, setExchange] = useState("BSE");
  const [searchTicker, setSearchTicker] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchStocks();
  }, [exchange]);

  const fetchStocks = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://your-backend-service.onrender.com/api/stocks?exchange=${exchange}`
      );
      setStocks(response.data.stocks);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSearch = () => {
    if (searchTicker) {
      navigate(`/stock/${searchTicker}`);
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

      <div className="exchange-buttons">
        <button onClick={() => setExchange("BSE")}>BSE</button>
        <button onClick={() => setExchange("NSE")}>NSE</button>
        <button onClick={() => setExchange("US")}>US Market</button>
        <button onClick={() => setExchange("Cryptocurrency")}>
          Cryptocurrency
        </button>
        <button onClick={() => setExchange("UK")}>UK Market</button>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <ClipLoader color="#36d7b7" size={50} /> {/* Loading animation */}
          <p>Loading stocks...</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr
                  key={index}
                  onClick={() => navigate(`/stock/${stock.symbol}`)}
                >
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>{stock.open}</td>
                  <td>{stock.high}</td>
                  <td>{stock.low}</td>
                  <td>{stock.close}</td>
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
