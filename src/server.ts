import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const www = require('./routes/index.js'); 


// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
//   next();
// });

app.disable('x-powered-by');

app.use('/', www);

//Error Handling, always goes last. 
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(3000, function () {
  console.log(`Example app listening on port ${PORT}`);
});







