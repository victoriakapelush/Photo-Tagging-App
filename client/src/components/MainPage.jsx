/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/mainPage.css";
import waldo from "../assets/waldo-icon.png";
import Game from "./Game";
import gameOne from "../assets/game-1.jpg";
import gameTwo from "../assets/game-2.jpg";

function MainPage() {
  return (
    <div className="container">
      <header className="flex-center">
        <div className="font-large padding">
          "Where is... <span className="red-font">Waldo?</span>"
        </div>
      </header>
      <main className="margin">
        <div className="flex-center">
          <img className="padding image-size" src={waldo}></img>
        </div>
        <div className="flex-center font-large padding">Games:</div>
        <div className="flex-center gap">
          <Game gameOne={gameOne} link="/game-one" />
          <Game gameOne={gameTwo} link="/game-two" />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
