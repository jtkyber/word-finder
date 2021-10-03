import React, { useState } from 'react';
import './App.css';

function App() {
  const [letters, setLetters] = useState('');
  const [length, setLength] = useState('');
  const [words, setWords] = useState([]);

  const findWords = async () => {
     try {
            const response = await fetch(`https://ancient-journey-59813.herokuapp.com/getSomeWords?letters=${letters.toLowerCase()}&wordLength=${length}`)
            if (!response.ok) {
                throw new Error('Error')
            }
            const results = await response.json();
            setWords(results);
        } catch(err) {
            console.log(err);
        }
  }

  return (
    <div className="app">
        <div className='search'>
          Letters: <input onChange={e => setLetters(e.target.value)} className='letters' type='text'/>
          Desired Word Length: <input onChange={e => setLength(e.target.value)} className='length' type='text'/>
        </div>
        <div className='enter'>
          <button onClick={findWords}>Enter</button>
        </div>
        <div className='results'>
        {
          words.map(word => {
            return (
              <div className='word' key={word}>
                <li>{word}</li>
              </div>
            )
          })
        }
        </div>
    </div>
  );
}

export default App;
