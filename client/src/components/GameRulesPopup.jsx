/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/gameRulesPopup.css";

function GameRulesPopup({ showGameRulesPopup, game }) {
  const topPercentage = game === "game-one" ? "5%" : "10%";

  return (
    <div className="popup-container" style={{ top: topPercentage }}>
      <div>
        There are three specific characters you need to locate. <br /> <br />{" "}
        Each character is hidden somewhere in the image. <br /> <br />
        Find and click on all three hidden characters in the image before the
        timer runs out (3 minutes).
      </div>
      <button onClick={showGameRulesPopup} className="button">
        Start
      </button>
    </div>
  );
}

export default GameRulesPopup;
