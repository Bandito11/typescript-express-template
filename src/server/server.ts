import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan'; //Only in dev
import fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev')); //Only in dev
const path = require('path');

// these are the paths of each folder to be used.
const dirPages = 'www/pages';

// this is the route to be used. 
// const index = require('./routes/index.js');

// Only allow if you want to use it as an API.
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
//   next();
// });

app.disable('x-powered-by');

//example of calling a route. 
// app.use('/index', index);

//In order to call static pages to be used on the front end. 
app.use(express.static(path.join(__dirname, 'www')));

//This will call the first page. The path can be changed to whatever you want.
app.get('/', function (req, res) {
  fs.readFile(`${__dirname}/${dirPages}/index.html`, function (err, data) {
    if (err) {
      res.status(500);
      console.error(err);
      res.end('Couldn\'t retrieve the page, please try again!');
    }
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'charset': 'utf-8'
    });
    res.end(data);
  });
});

//Error Handling, always goes last. 
app.use(function (err, req, res, next) {
  console.error(err)
  res.end('There was an error in the system, please try again!');
});

const PORT = process.env.PORT || 3000;
app.listen(3000, function () {
  console.log(`Listening on port: ${PORT}`);
});







