import * as express from 'express'
import * as bodyParser from 'body-parser'
import *  as helmet from 'helmet'
import * as passport from 'passport'
import { verify } from 'jsonwebtoken'
import { Response } from 'express'

const app = express()
require('dotenv').config()

if (!process.env.NODE_ENV) require('dotenv').config()
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  require('http').globalAgent.maxSockets = Infinity
} else {
  require('http').globalAgent.maxSockets = 5
  app.use(require('morgan')('dev'))
}


require('./authenticate.js')(passport)
app.use(passport.initialize())

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', '*') // uncomment if server is used as API
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
  next()
})


// Imported routes to be used
const authRoutes = require('./authRoutes.js')
const example = require('./example.js')
const example2 = require('./example2.js')

// Route used to Authenticate //
app.use('/authenticate', authRoutes)

//Unauthenticated Routes
app.use('/example', example)

// Route to verify Authentication
app.use((req, res, next) => {
  const authorization = req.headers.authorization.slice(6, req.headers.authorization.length).trim()
  verify(authorization, /*req.query.token.toString(),*/ process.env.JSONWEBTOKEN_SECRET, (error, decoded) => {
    if (error) {
      /**
       * Possible errors as of 4/24/2018:
       * JsonWebTokenError
       * NotBeforeError
       * TokenExpiredError
       * 
       * Error Params: name, message, expiredAt
       */
      res.send(error)
    }
    else {
      req.params.decoded = JSON.stringify(decoded)
      next()
    }
  })
})

// Authenticated Route //
app.use('/example2', example2)



//Error Handling, always goes last. 
app.use(function (err: Error, req, res: Response, _next) {
  console.error('*****************SERVER ERROR MESSAGE*****************')
  console.error(err)
  console.error('***********************************************')
  if (err) {
    res.send(err)
  } else {
    res.send('There was an unknown error in the system, please try again!')
  }
})

app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`)
})

