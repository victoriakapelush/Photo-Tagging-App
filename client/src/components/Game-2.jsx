/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Popup from "./Popup";
import "../styles/index.css";
import GameRulesPopup from "./GameRulesPopup";
import GameOverPopup from "./GameOverPopup";
import "../styles/gameRulesPopup.css";
import Timer from "./Timer";

const Game2 = ({ game }) => {
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [rangeCoordinatesBalloon, setRangeCoordinatesBalloon] = useState(null);
  const [rangeCoordinatesGhostface, setRangeCoordinatesGhostface] =
    useState(null);
  const [rangeCoordinatesPug, setRangeCoordinatesPug] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);
  const [gameOverTime, setGameOverTime] = useState("");
  const intervalRef = useRef(null); // Create a ref to store the interval ID
  const [images, setImages] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const originalWidth = 1920;
  const originalHeight = 3858;

  // Fetch background image and character icons for game two from the server
  const fetchImagesAndCharacters = async () => {
    try {
      const response = await fetch("http://localhost:8000/game-two");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data && data.image && data.characters) {
        setImages(data.image); // Set the background image for game two
        setAllCharacters(data.characters); // Set the three characters
        setRangeCoordinatesBalloon(data.characters[0].coordinates);
        setRangeCoordinatesPug(data.characters[1].coordinates);
        setRangeCoordinatesGhostface(data.characters[2].coordinates);
      } else {
        throw new Error("Invalid data structure"); // Handle unexpected data structure
      }
    } catch (error) {
      console.error(error);
      return null; // Return null in case of error
    }
  };

  useEffect(() => {
    fetchImagesAndCharacters();
  }, []);

  const showGameRulesPopup = () => {
    setShowPopup(false);
    startTimer();
  };

  // Update image dimensions when the image loads
  const updateImageDimensions = (event) => {
    const imgElement = event.target;
    setImageDimensions({
      width: imgElement.clientWidth,
      height: imgElement.clientHeight,
    });
  };

  useEffect(() => {
    if (foundCharacters.length === 3 && !gameOver) {
      clearInterval(intervalRef.current); // Stop the timer
      setGameOver(true);
      setGameOverMessage(
        <>
          Game Over. <br />
          <br />
          You found all the characters. <br />
          <br />
          Congrats!
        </>,
      );
      setShowGameOverPopup(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
      setGameOverTime(getTimeString());
    } else if (
      foundCharacters.length < 3 &&
      remainingSeconds === 0 &&
      gameOver
    ) {
      clearInterval(intervalRef.current); // Stop the timer
      setGameOverMessage(
        <>
          Game Over. <br />
          <br />
          You lost, but you can try again.
        </>,
      );
      setGameOver(true);
      setShowGameOverPopup(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
    }
  }, [foundCharacters, gameOver]);

  const handleClick = async (event) => {
    if (gameOver) return;
    const { width: imageWidth, height: imageHeight } = imageDimensions;

    // Ensure image dimensions are set
    if (imageWidth === 0 || imageHeight === 0) {
      console.error("Image dimensions not set correctly");
      return;
    }

    // Get click coordinates relative to the image's position in the viewport
    const rect = event.target.getBoundingClientRect();
    const clickX = ((event.clientX - rect.left) / imageWidth) * originalWidth;
    const clickY = ((event.clientY - rect.top) / imageHeight) * originalHeight;

    // Game one logic
    if (
      rangeCoordinatesBalloon &&
      clickX >= rangeCoordinatesBalloon[0][0] &&
      clickX <= rangeCoordinatesBalloon[1][0] &&
      clickY >= rangeCoordinatesBalloon[0][1] &&
      clickY <= rangeCoordinatesBalloon[1][1] &&
      !foundCharacters.includes("Balloon")
    ) {
      setFoundCharacters((prevCharacters) => {
        if (!prevCharacters.includes("Balloon")) {
          return [...prevCharacters, "Balloon"];
        }
        return prevCharacters;
      });
      setPopupMessage(
        `Yay! You found Balloon! Your time is ${getTimeString()}`,
      );
    } else if (
      rangeCoordinatesPug &&
      clickX >= rangeCoordinatesPug[0][0] &&
      clickX <= rangeCoordinatesPug[1][0] &&
      clickY >= rangeCoordinatesPug[0][1] &&
      clickY <= rangeCoordinatesPug[1][1] &&
      !foundCharacters.includes("Pug")
    ) {
      setFoundCharacters((prevCharacters) => {
        if (!prevCharacters.includes("Pug")) {
          return [...prevCharacters, "Pug"];
        }
        return prevCharacters;
      });
      setPopupMessage(`Yay! You found Pug! Your time is ${getTimeString()}`);
    } else if (
      rangeCoordinatesGhostface &&
      clickX >= rangeCoordinatesGhostface[0][0] &&
      clickX <= rangeCoordinatesGhostface[1][0] &&
      clickY >= rangeCoordinatesGhostface[0][1] &&
      clickY <= rangeCoordinatesGhostface[1][1] &&
      !foundCharacters.includes("Ghostface")
    ) {
      setFoundCharacters((prevCharacters) => {
        if (!prevCharacters.includes("Ghostface")) {
          return [...prevCharacters, "Ghostface"];
        }
        return prevCharacters;
      });
      setPopupMessage(
        `Yay! You found Ghostface! Your time is ${getTimeString()}`,
      );
    } else {
      setPopupMessage("Nope. Keep looking.");
    }
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Function to start the countdown
  function startTimer() {
    setIsTimerRunning(true);
  }

  // Display the accurate time on popup window after the character is found
  const getTimeString = () => {
    const initialTime = 180; // 3 minutes in seconds
    const elapsedSeconds = initialTime - seconds;
    const minutes = Math.floor(elapsedSeconds / 60);
    const remainingSeconds = elapsedSeconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds} seconds.`;
    } else if (minutes === 1) {
      return `${minutes} minute and ${remainingSeconds} seconds.`;
    } else {
      return `${minutes} minutes and ${remainingSeconds} seconds.`;
    }
  };

  // Set a timer for a popup window to vanish after 4 seconds
  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  return (
    <div>
      <header className="character-container">
        <div className="rules">
          <div className="timer">
            <Timer
              isTimerRunning={isTimerRunning}
              setSeconds={setSeconds}
              setGameOver={setGameOver}
              intervalRef={intervalRef}
            />
            Timer: {minutes}:{remainingSeconds < 10 ? "0" : ""}
            {remainingSeconds}
          </div>
        </div>
        <div className="single-icons">
          {allCharacters &&
            allCharacters.map((character) => (
              <div key={character._id}>
                <img
                  className="character-icon"
                  src={`http://localhost:8000/${character.image}`}
                  alt={`Character ${character.name}`}
                  style={{
                    display: foundCharacters.includes(character.name)
                      ? "none"
                      : "block",
                  }}
                />
              </div>
            ))}
        </div>
      </header>
      <div
        className={`image-container ${showPopup ? "blurred-background" : ""}`}
      >
        {images && (
          <img
            className="background-image"
            key={images._id}
            src={`http://localhost:8000/${images.image}`}
            alt="background image with all the characters"
            onClick={handleClick}
            onLoad={updateImageDimensions}
          />
        )}
      </div>
      {showPopup && (
        <GameRulesPopup showGameRulesPopup={showGameRulesPopup} game={game} />
      )}
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
      {showGameOverPopup && (
        <GameOverPopup game={game} gameOverMessage={gameOverMessage} />
      )}
    </div>
  );
};

export default Game2;
