import express from 'express';
import * as bodyParser from 'body-parser'
import helmet from 'helmet';
import { Response } from 'express'

const app = express();
require('dotenv').config();

if (!process.env.NODE_ENV) require('dotenv').config();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  require('http').globalAgent.maxSockets = Infinity;
} else {
  require('http').globalAgent.maxSockets = 5;
  app.use(require('morgan')('dev'));
}

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next()
})

app.get('/', (req, res, next) => {
  res.send(`Hi from locahost:${PORT}!`);
})

//Error Handling, always goes last. 
app.use(function (err: Error, req, res: Response, _next) {
  console.error('*****************SERVER ERROR MESSAGE*****************');
  console.error(err);
  console.error('***********************************************');
  //TODO: Implement 404 error
})

app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`);
})

