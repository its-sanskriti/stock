import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Prediction from "./Prediction";
import { ClipLoader } from "react-spinners";

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
    "1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"
  ];

  useEffect(() => {
    fetchStockInfo();
  }, [ticker, chartPeriod, tablePeriod]);

  const fetchStockInfo = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const chartConfig = {
    ...graphData1,
    layout: {
      ...graphData1.layout,
      transition: {
        duration: 500,
        easing: 'cubic-in-out'
      }
    }
  };

  return (
    <motion.div 
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants}>
        Stock Analyzer
      </motion.h1>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            className="loading-spinner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ClipLoader color="#36d7b7" size={50} />
            <motion.p
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              please wait while Loading...
            </motion.p>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              It takes less than a minute
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.section className="section2" variants={itemVariants}>
              <motion.div className="stock-info" variants={slideInLeft}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {ticker} - {stockInfo.name || "Stock"}
                  </motion.h2>
                  
                  {Object.entries({
                    Open: stockInfo.open,
                    Close: stockInfo.close,
                    Low: stockInfo.low,
                    High: stockInfo.high,
                    Exchange: stockInfo.exchange
                  }).map(([key, value], index) => (
                    <motion.h3
                      key={key}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <strong>{key}:</strong> {value}
                    </motion.h3>
                  ))}
                </motion.div>

                <motion.div 
                  className="period-buttons"
                  variants={itemVariants}
                >
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Select Period:
                  </motion.h3>
                  {periods.map((period, index) => (
                    <motion.button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        backgroundColor: chartPeriod === period ? "#0056b3" : "#007bff" 
                      }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {period}
                    </motion.button>
                  ))}
                </motion.div>

                <motion.div 
                  className="visualization"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="vis2">
                    {graphData1.data && graphData1.layout ? (
                      <Plot 
                        data={graphData1.data} 
                        layout={chartConfig.layout}
                        config={{
                          displayModeBar: true,
                          responsive: true,
                          toImageButtonOptions: {
                            format: 'png',
                            filename: `${ticker}_chart`,
                            height: 500,
                            width: 900,
                            scale: 1
                          }
                        }}
                      />
                    ) : (
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Loading visualization...
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="news" variants={slideInRight}>
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Latest news about {ticker}
                </motion.h2>
                <AnimatePresence>
                  {news.length > 0 ? (
                    news.map((article, index) => (
                      <motion.div
                        key={index}
                        className="news-item"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {article.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <strong>Source:</strong> {article.source?.name || "N/A"} |{" "}
                          <strong>Date:</strong> {article.publishedAt || "N/A"}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {article.description || "No summary available."}
                        </motion.p>
                        <motion.a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read more
                        </motion.a>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      No news available.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.section>

            <motion.div 
              className="period-buttons"
              variants={itemVariants}
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Select Period:
              </motion.h3>
              {periods.map((period, index) => (
                <motion.button
                  key={period}
                  onClick={() => setTablePeriod(period)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    backgroundColor: tablePeriod === period ? "#0056b3" : "#007bff"
                  }}
                  transition={{ delay: index * 0.05 }}
                >
                  {period}
                </motion.button>
              ))}
            </motion.div>

            <motion.h2 variants={itemVariants}>
              Stock Data
            </motion.h2>

            <motion.div className="table" variants={itemVariants}>
              <motion.div 
                className="table-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
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
                    <AnimatePresence>
                      {stockData
                        .slice(0, showMore ? stockData.length : 15)
                        .map((entry, index) => (
                          <motion.tr
                            key={`${entry.Date}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.3 }}
                            whileHover={{
                              scale: 1.01,
                              backgroundColor: "#e3f2fd"
                            }}
                          >
                            <td>{entry.Date}</td>
                            <td>{entry.Open}</td>
                            <td>{entry.High}</td>
                            <td>{entry.Low}</td>
                            <td>{entry.Close}</td>
                            <td>{entry.Volume}</td>
                          </motion.tr>
                        ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
              {stockData.length > 15 && (
                <motion.button
                  onClick={handleShowMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {showMore ? "Show Less" : "Show More"}
                </motion.button>
              )}
            </motion.div>

            <motion.button
              onClick={() => setShowPrediction(!showPrediction)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {showPrediction ? "Hide Prediction" : "Show Prediction"}
            </motion.button>

            <AnimatePresence>
              {showPrediction && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Prediction ticker={ticker} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Stockdata;
