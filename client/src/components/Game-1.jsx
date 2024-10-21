/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import Popup from "./Popup";
import "../styles/index.css";
import GameRulesPopup from "./GameRulesPopup";
import GameOverPopup from "./GameOverPopup";
import "../styles/gameRulesPopup.css";
import Timer from "./Timer";

const Game1 = ({ game }) => {
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [rangeCoordinates, setRangeCoordinates] = useState(null);
  const [rangeCoordinatesBrian, setRangeCoordinatesBrian] = useState(null);
  const [rangeCoordinatesWaldo, setRangeCoordinatesWaldo] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);
  const [gameOverTime, setGameOverTime] = useState("");
  const intervalRef = useRef(null); // Create a ref to store the interval ID
  const [images, setImages] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const originalWidth = 2000;
  const originalHeight = 8422;

  // Fetch background image and character icons for game one from the server
  const fetchImagesAndCharacters = async () => {
    try {
      const response = await fetch("https://photo-tagging-app-u7si.onrender.com/game-one");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      if (data && data.image && data.characters) {
        setImages(data.image); // Set the background image for game two
        setAllCharacters(data.characters); // Set the last three characters
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

    try {
      const rangeResponse = await fetch("https://photo-tagging-app-u7si.onrender.com");
      if (!rangeResponse.ok) {
        throw new Error("Failed to fetch range coordinates");
      }
      const rangeData = await rangeResponse.json();

      // Set characters' coordinates for game one
      setRangeCoordinates(rangeData.characters[1].coordinates);
      setRangeCoordinatesBrian(rangeData.characters[2].coordinates);
      setRangeCoordinatesWaldo(rangeData.characters[0].coordinates);

      // Game one logic
      if (
        rangeCoordinates &&
        clickX >= rangeCoordinates[0][0] &&
        clickX <= rangeCoordinates[1][0] &&
        clickY >= rangeCoordinates[0][1] &&
        clickY <= rangeCoordinates[1][1] &&
        !foundCharacters.includes("Wilson")
      ) {
        setFoundCharacters((prevCharacters) => {
          if (!prevCharacters.includes("Wilson")) {
            return [...prevCharacters, "Wilson"];
          }
          return prevCharacters;
        });
        setPopupMessage(
          `Yay! You found Wilson! Your time is ${getTimeString()}`,
        );
      } else if (
        rangeCoordinatesBrian &&
        clickX >= rangeCoordinatesBrian[0][0] &&
        clickX <= rangeCoordinatesBrian[1][0] &&
        clickY >= rangeCoordinatesBrian[0][1] &&
        clickY <= rangeCoordinatesBrian[1][1] &&
        !foundCharacters.includes("Brian")
      ) {
        setFoundCharacters((prevCharacters) => {
          if (!prevCharacters.includes("Brian")) {
            return [...prevCharacters, "Brian"];
          }
          return prevCharacters;
        });
        setPopupMessage(
          `Yay! You found Brian! Your time is ${getTimeString()}`,
        );
      } else if (
        rangeCoordinatesWaldo &&
        clickX >= rangeCoordinatesWaldo[0][0] &&
        clickX <= rangeCoordinatesWaldo[1][0] &&
        clickY >= rangeCoordinatesWaldo[0][1] &&
        clickY <= rangeCoordinatesWaldo[1][1] &&
        !foundCharacters.includes("Waldo")
      ) {
        setFoundCharacters((prevCharacters) => {
          if (!prevCharacters.includes("Waldo")) {
            return [...prevCharacters, "Waldo"];
          }
          return prevCharacters;
        });
        setPopupMessage(
          `Yay! You found Waldo! Your time is ${getTimeString()}`,
        );
      } else {
        setPopupMessage("Nope. Keep looking.");
      }
    } catch (error) {
      console.error(error);
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
            allCharacters.slice(0, 3).map((character) => (
              <div key={character._id}>
                <img
                  className="character-icon"
                  src={`https://photo-tagging-app-u7si.onrender.com/${character.image}`}
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
        <img
          className="background-image"
          key={images._id}
          src={`https://photo-tagging-app-u7si.onrender.com/${images.image}`}
          alt="background image with all the characters"
          onClick={handleClick}
          onLoad={updateImageDimensions}
        />
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

export default Game1;
