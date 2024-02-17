import { useEffect, useState } from 'react';
import './styles/index.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [characters, setCharacters] = useState([]);

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

  return (
    <div>
      <header className="character-container">
        <div className='rules'>
          <p>The rules are very simple: </p>
          <p>1. Look at the given illustration.</p>
          <p>2. Find Waldo, Brian, and Wilson, who are hidden among numerous other characters and objects (the characters on the right).</p>
          <p>3. There is time limit; do not take too long to find them.</p>
          <p>4. You win when you successfully locate them all.</p>
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
          <img className='background-image' key={image._id} src={`http://localhost:3000/${image.image}`} alt="background image with all the characters" />
        ))}
      </div>
    </div>
  );
};

export default App;
