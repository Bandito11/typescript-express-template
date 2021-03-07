import express from 'express';
import helmet from 'helmet';
import { Response } from 'express'
import dotenv from 'dotenv';
import http from 'http';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  http.globalAgent.maxSockets = Infinity;
} else {
  http.globalAgent.maxSockets = 5;
  app.use(require('morgan')('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.use((err: Error, req, res: Response, _next) => {
  console.error('*****************SERVER ERROR MESSAGE*****************');
  console.error(err);
  console.error('***********************************************');
  //TODO: Implement 404 error
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})

