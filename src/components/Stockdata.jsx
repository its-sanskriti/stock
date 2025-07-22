import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import Prediction from "./Prediction";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

function Stockdata() {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState([]);
  const [graphData1, setGraphData1] = useState({});
  const [graphData2, setGraphData2] = useState({});
  const [stockInfo, setStockInfo] = useState({});
  const [news, setNews] = useState([]);
  const [chartPeriod, setChartPeriod] = useState("1mo");
  const [tablePeriod, setTablePeriod] = useState("1mo");
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  const periods = [
    "1d",
    "5d",
    "1mo",
    "3mo",
    "6mo",
    "1y",
    "2y",
    "5y",
    "10y",
    "ytd",
    "max",
  ];

  useEffect(() => {
    fetchStockInfo();
  }, [ticker, chartPeriod, tablePeriod]);

  const fetchStockInfo = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/stock?ticker=${ticker}&chart_period=${chartPeriod}&table_period=${tablePeriod}`
      );

      setStockData(res.data.stock_data);
      setGraphData1(JSON.parse(res.data.graph_data1));
      setGraphData2(JSON.parse(res.data.graph_data2));
      setStockInfo(res.data.stock_info);
      setNews(Array.isArray(res.data.stock_news) ? res.data.stock_news : []);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="container">
      <h1>Stock Analyzer</h1>
      {isLoading ? (
        <div className="loading-spinner">
          <ClipLoader color="#36d7b7" size={50} /> {/* Loading animation */}
          <p>please wait while Loading...</p>
          <p>It takes less than a minuate</p>
        </div>
      ) : (
        <>
          <section className="section2">
            <div className="stock-info">
              <div>
                <h2>
                  {ticker} - {stockInfo.name || "Stock"}
                </h2>
                <h3>
                  <strong>Open:</strong> {stockInfo.open}
                </h3>
                <h3>
                  <strong>Close:</strong> {stockInfo.close}
                </h3>
                <h3>
                  <strong>Low:</strong> {stockInfo.low}
                </h3>
                <h3>
                  <strong>High:</strong> {stockInfo.high}
                </h3>
                <h3>
                  <strong>Exchange:</strong> {stockInfo.exchange}
                </h3>
              </div>
              <div className="period-buttons">
                <h3>Select Period:</h3>
                {periods.map((period) => (
                  <button key={period} onClick={() => setChartPeriod(period)}>
                    {period}
                  </button>
                ))}
              </div>
              <div className="visualization">
                <div className="vis2">
                  {graphData1.data && graphData1.layout ? (
                    <Plot data={graphData1.data} layout={graphData1.layout} />
                  ) : (
                    <p>Loading visualization...</p>
                  )}
                </div>
              </div>
            </div>
            <div className="news">
              <h2>Latest news about {ticker}</h2>
              {news.length > 0 ? (
                news.map((article, index) => (
                  <div key={index} className="news-item">
                    <h3>{article.title}</h3>
                    <p>
                      <strong>Source:</strong> {article.source?.name || "N/A"} |{" "}
                      <strong>Date:</strong> {article.publishedAt || "N/A"}
                    </p>
                    <p>{article.description || "No summary available."}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                  </div>
                ))
              ) : (
                <p>No news available.</p>
              )}
            </div>
          </section>
          <div className="period-buttons">
            <h3>Select Period:</h3>
            {periods.map((period) => (
              <button key={period} onClick={() => setTablePeriod(period)}>
                {period}
              </button>
            ))}
          </div>
          <h2>Stock Data</h2>
          <div className="table">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData
                    .slice(0, showMore ? stockData.length : 15)
                    .map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.Date}</td>
                        <td>{entry.Open}</td>
                        <td>{entry.High}</td>
                        <td>{entry.Low}</td>
                        <td>{entry.Close}</td>
                        <td>{entry.Volume}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {stockData.length > 15 && (
              <button onClick={handleShowMore}>
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <button onClick={() => setShowPrediction(!showPrediction)}>
            {showPrediction ? "Hide Prediction" : "Show Prediction"}
          </button>
          {showPrediction && <Prediction ticker={ticker} />}
        </>
      )}
    </div>
  );
}

export default Stockdata;
