import express from 'express';
import helmet from 'helmet';
import { Response } from 'express'
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.NODE_ENV) {
  dotenv.config();
} else if (process.env.NODE_ENV === 'production') {
  http.globalAgent.maxSockets = Infinity;
} else {
  http.globalAgent.maxSockets = 5;
  app.use(morgan('dev'));
}

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

