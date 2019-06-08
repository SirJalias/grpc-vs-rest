const path = require('path');
const Mali = require('mali');
const express = require('express');

const logger = require('@malijs/logger');

const PROTO_PATH = path.resolve(__dirname, './protos/city.proto');
const HOSTPORT = '0.0.0.0:50051';
const RESTPORT = 5005;

const cities = require('./cities.json');

const newCities = [];
for (let i = 0; i < 1500; i += 1) {
  newCities.push(cities[i]);
}

function getCities(ctx) {
  ctx.res = { cities: newCities };
}

function restServer() {
  const app = express();
  app.get('/cities', (req, res) => {
    return res.status(200).json({ cities: newCities });
  });
  app.listen(RESTPORT, () =>
    console.log(`Example app listening on port ${RESTPORT}!`)
  );
}

function grpcServer() {
  const app = new Mali(PROTO_PATH, 'GeoCity');
  app.use(logger());
  app.use({ getCities });

  app.start(HOSTPORT);
  console.log(`gRPC service running @ ${HOSTPORT}`);
}

grpcServer();
restServer();
