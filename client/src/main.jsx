import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameContainer from "./GameContainer.jsx";
import "./styles/index.css";
import MainPage from "./components/MainPage.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/game-one" element={<GameContainer game="game-one" />} />
        <Route path="/game-two" element={<GameContainer game="game-two" />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
