import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

function App() {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <button onClick={() => setClicked(prev => !prev)}>
        {!clicked ? 'unmount' : 'mount'}
      </button>
      {!clicked && <Character id={random()}/>}
    </div>
  );
}

function random() {
  return Math.floor(1 + Math.random() * 100);
}

function Character({ id = 1 }) {
  const [{ name, image }, setData] = useState({
    name: 'loading...',
    image: null
  });
  useEffect(() => getCharacter(id).then(json => setTimeout(() => setData(json), 1000)), [id]);
  return (
    <figure>
      {image && <img src={image} alt={name}/>}
      <figcaption>{name}</figcaption>
    </figure>
  );
}

const API_URL = 'https://rickandmortyapi.com/api/character';

async function getCharacter(id = 1) {
  return fetch(`${API_URL}/${id}`).then(response => response.json());
}
