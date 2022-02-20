import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Character/>
  </React.StrictMode>,
  document.getElementById('root')
);

function Character({ id = 1 }) {
  const [{ name, image }, setData] = useState({
    name: 'loading...',
    image: null
  });
  useEffect(() => getCharacter(id).then(json => setData(json)), [id]);
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
