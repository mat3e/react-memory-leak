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
  const [data, setData] = useState(getData());
  useEffect(() => getCharacter(id).then(json => setData([json])), [id]);
  return (
    <figure>
      {data[0].image && <img src={data[0].image} alt={data[0].name}/>}
      <figcaption>{data[0].name}</figcaption>
    </figure>
  );
}

function getData() {
  // WARNING: we generate a big array here, but use just its first element
  return new Array(999999).fill(null).map(() => ({
    name: 'loading...',
    image: null
  }));
}

const API_URL = 'http://localhost:9999';

async function getCharacter(id = 1) {
  return fetch(`${API_URL}/${id}`).then(response => response.json());
}
