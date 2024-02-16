/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from "axios";
import './styles/index.css'

function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000"); 
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        setError('Error fetching images');
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="image-container">
        {images.map(image => (
          <img className='image' key={image._id} src={`http://localhost:3000/${image.image}`} alt={image.description} />
        ))}
      </div>
    </div>
  );
}


export default App;
