/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/gameRulesPopup.css";

function GameOverPopup({ gameOverMessage, game }) {
  const topPercentage = game === "game-one" ? "5%" : "10%";

  return (
    <div className="popup-container" style={{ top: topPercentage }}>
      <div className="game-over-div">{gameOverMessage}</div>
      <Link to="/home" className="go-home-btn">
        Go to Main Page
      </Link>
    </div>
  );
}

export default GameOverPopup;
