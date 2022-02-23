import { createServer } from 'http';
import { get } from 'https';

const port = 9999;
const delay = 120_000;

createServer((req, res) => {
  setTimeout(() => {
    getCharacter(+req.url.substr(1)).then((result) => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2_592_000
      });
      res.write(result);
      res.end();
    });
  }, delay);
}).listen(port);

const API_URL = 'https://rickandmortyapi.com/api/character';

async function getCharacter(id = 1) {
  return new Promise((resolve, reject) => {
    get(`${API_URL}/${id}`, (res) => {
      let result = '';
      res.on('data', (chunk) => {
        result += chunk;
      });
      res.on('end', () => {
        resolve(result);
      });
    }).on('error', error => {
      reject(error);
    }).end();
  });
}
