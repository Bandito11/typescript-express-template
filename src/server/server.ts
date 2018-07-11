import * as express from 'express';
import * as bodyParser from 'body-parser';
import *  as helmet from 'helmet';
import { verifyAuthentication } from './authenticate/authenticate.module';
/////only in development environment. Comment this section otherwise!
require('dotenv').config();
require('http').globalAgent.maxSockets = 5;
app.use(require(morgan('dev'))); //Only in dev
////////////////////////////////////////
// require('http').globalAgent.maxSockets = Infinity; //Uncomment for distribution
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');
app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*"); // uncomment if server is used as API
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  next();
});
//In order to call static pages to be used on the front end. 
app.use(express.static(path.join(__dirname, 'www')));
// Imported routes to be used
const main = require('./main/main.route.js');
const authenticate = require('./authenticate/authenticate.route.js');

//Routes
app.get('*', main);

// Api Routes
const apiRoutes = express.Router();

// Route used to Authenticate
apiRoutes.use('/authenticate', authenticate);

// Route to verify Authentication
apiRoutes.use(verifyAuthentication);

// Authenticated routes
// apiRoutes.use('/my_custom_route', myCustomRoute); An example of using a imported route.

app.use(apiRoutes);

//Error Handling, always goes last. 
app.use(function (err, req, res, next) {
  console.error(err)
  res.end('There was an error in the system, please try again!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`);
});
