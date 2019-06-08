const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const caller = require('grpc-caller');
const compression = require('compression');

const PROTO_PATH = path.resolve(__dirname, './protos/city.proto');
const client = caller('0.0.0.0:50051', PROTO_PATH, 'GeoCity');
const app = express();
const port = 3000;

app.get('/cities-grpc', async (req, res) => {
  return client.getCities().then(data => {
    return res.status(200).json(data);
  });
});

app.get('/cities-rest', (req, res) => {
  return fetch('http://localhost:5005/cities')
    .then(rr => rr.json())
    .then(data => res.status(200).json(data));
});

app.use(compression({ level: 1 }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
