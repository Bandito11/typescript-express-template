import * as express from 'express';
import * as bodyParser from 'body-parser';
import *  as helmet from 'helmet';
import { verifyAuthentication } from './authenticate/authenticate.module';

const app = express();
const path = require('path');

if (!process.env.NODE_ENV) require('dotenv').config();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  require('http').globalAgent.maxSockets = 5;
  app.use(require('morgan')('dev'));
} else require('http').globalAgent.maxSockets = Infinity;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  if (process.env.NODE_ENV !== 'production') res.header('Access-Control-Allow-Origin', '*'); // uncomment if server is used as API

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});


// Imported routes to be used
const authenticate = require('./authenticate/authenticate.route.js');
const example = require('./example/example.route.js');

//Unauthenticated Routes
app.use('/example', example);

// Api Routes
const apiRoutes = express.Router();

// Route used to Authenticate
apiRoutes.use('/authenticate', authenticate);

// Route to verify Authentication
apiRoutes.use(verifyAuthentication);
// Authenticated routes
// apiRoutes.use('/my_custom_route', myCustomRoute); An example of using a imported route.


//In order to call static pages to be used on the front end.
app.use(express.static(path.join(__dirname, 'www'))); 
const index = require('./index/index.route.js');

// This will call the first page. The path can be changed to whatever you want.
app.get('*', index);

app.use(apiRoutes);
/////////////////////////

//Error Handling, always goes last. 
app.use(function (err, req, res, next) {
  console.error(err)
  res.end('There was an error in the system, please try again!');
});

app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`);
});
