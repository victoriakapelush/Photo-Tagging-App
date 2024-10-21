/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Game1 from "./components/Game-1";
import Game2 from "./components/Game-2";

const GameContainer = ({ game }) => {
  return (
    <div>
      {game === "game-one" && <Game1 game={game} />}{" "}
      {/* Render Game1 if the game prop is "game-one" */}
      {game === "game-two" && <Game2 game={game} />}{" "}
      {/* Render Game2 if the game prop is "game-two" */}
    </div>
  );
};

export default GameContainer;
