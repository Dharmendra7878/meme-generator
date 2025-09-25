// Filename - App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  const [randomImg, setRandomImg] = useState('');

  // Fetch memes from API when component mounts
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        setAllMemeImgs(data.data.memes);
      });
  }, []);

  // Handle text input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'topText') setTopText(value);
    if (name === 'bottomText') setBottomText(value);
  };

  // Generate random meme image
  const handleSubmit = (event) => {
    event.preventDefault();
    const randIndex = Math.floor(Math.random() * allMemeImgs.length);
    const randImg = allMemeImgs[randIndex]?.url || '';
    setRandomImg(randImg);
  };

  return (
    <div>
      <form className='meme-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='topText'
          placeholder='Top Text'
          value={topText}
          onChange={handleChange}
        />
        <input
          type='text'
          name='bottomText'
          placeholder='Bottom Text'
          value={bottomText}
          onChange={handleChange}
        />
        <button type='submit'>Generate</button>
      </form>

      <br />

      <div className='meme'>
        {randomImg && (
          <>
            <img src={randomImg} alt='meme' />
            <h2 className='top'>{topText}</h2>
            <h2 className='bottom'>{bottomText}</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
