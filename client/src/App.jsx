/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './styles/index.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [rangeCoordinates, setRangeCoordinates] = useState(null); 
  const [rangeCoordinatesBrian, setRangeCoordinatesBrian] = useState(null); 
  const [rangeCoordinatesWaldo, setRangeCoordinatesWaldo] = useState(null); 
  const [seconds, setSeconds] = useState(0);

  const handleClick = async (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;
  
    try {
      const rangeResponse = await fetch('http://localhost:3000');
      if (!rangeResponse.ok) {
        throw new Error('Failed to fetch range coordinates');
      }
      const rangeData = await rangeResponse.json();
      setRangeCoordinates(rangeData.characters[1].coordinates); // Set range coordinates for Wilson
      setRangeCoordinatesBrian(rangeData.characters[2].coordinates); // Set range coordinates for Brian
      setRangeCoordinatesWaldo(rangeData.characters[0].coordinates); // Set range coordinates for Waldo
  
  
      if (
        rangeCoordinates &&
        clickX >= rangeCoordinates[0][0] &&
        clickX <= rangeCoordinates[1][0] &&
        clickY >= rangeCoordinates[0][1] &&
        clickY <= rangeCoordinates[1][1]
      ) {
        alert(`Yay! You found Wilson! Your time is ${getTimeString()}`);
      } 
      else if (
        rangeCoordinatesBrian &&
        clickX >= rangeCoordinatesBrian[0][0] &&
        clickX <= rangeCoordinatesBrian[1][0] &&
        clickY >= rangeCoordinatesBrian[0][1] &&
        clickY <= rangeCoordinatesBrian[1][1]
      ) {
        alert(`Yay! You found Brian! Your time is ${getTimeString()}`);
      } else if (
        rangeCoordinatesWaldo &&
        clickX >= rangeCoordinatesWaldo[0][0] &&
        clickX <= rangeCoordinatesWaldo[1][0] &&
        clickY >= rangeCoordinatesWaldo[0][1] &&
        clickY <= rangeCoordinatesWaldo[1][1]
      ) {
        alert(`Yay! You found Waldo! Your time is ${getTimeString()}`);
      } 

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchImagesAndCharacters();
  }, []);

  const fetchImagesAndCharacters = async () => {
    try {
      const response = await fetch('http://localhost:3000');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setImages(data.images);
      setCharacters(data.characters);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const getTimeString = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes === 0) {
      return `${remainingSeconds} seconds.`;
    } else if (minutes === 1) {
      return `${minutes} minute and ${remainingSeconds} seconds.`;
    } else {
    return `${minutes} minutes and ${remainingSeconds} seconds.`;
    }
  };

  return (
    <div>
      <header className="character-container">
        <div className='rules'>
          <p>The rules are very simple: </p>
          <p>1. Look at the given illustration.</p>
          <p>2. Find Waldo, Brian, and Wilson, who are hidden among numerous other characters and objects (the characters on the right).</p>
          <p>3. There is time limit; do not take too long to find them.</p>
          <p>4. You win when you successfully locate them all.</p>
          <div>
            Timer: {minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}
          </div>
        </div>
        <div className='single-icons'>
          {characters.map((character) => (
            <div key={character._id}>
              <img className='character-icon' src={`http://localhost:3000/${character.image}`} alt={`Character ${character.name}`} />
            </div>
          ))}
        </div>
      </header>
      <div className="image-container">
        {images.map((image) => (
          <img onClick={handleClick} className='background-image' key={image._id} src={`http://localhost:3000/${image.image}`} alt="background image with all the characters" />
        ))}
      </div>
      <div>
      </div>
    </div>
  );
};

export default App;
