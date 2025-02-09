import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StocksList from "./components/StockList";
import Stockdata from "./components/Stockdata";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<StocksList />} />
            <Route path="/stock/:ticker" element={<Stockdata />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
