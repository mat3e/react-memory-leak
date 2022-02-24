import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMountSubscription } from "./useMountSubscription";
import { fromFetch } from "rxjs/fetch";
import { switchMap } from "rxjs/operators";

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
  useMountSubscription(() => getCharacter(id).subscribe(json => setData([json])), [id]);
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

function getCharacter(id = 1) {
  return fromFetch(`${API_URL}/${id}`).pipe(switchMap(response => response.json()));
}
