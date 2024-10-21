/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/mainPage.css";
import { Link } from "react-router-dom";

function Game({ gameOne, link }) {
  return (
    <Link to={link} className="game-container">
      <img src={gameOne} />
    </Link>
  );
}

export default Game;
