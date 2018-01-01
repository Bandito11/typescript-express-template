"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
const path = require('path');
const dirPages = 'www/pages';
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'www')));
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
app.use(function (err, req, res, next) {
    console.error(err);
    res.end('There was an error in the system, please try again!');
});
const PORT = process.env.PORT || 3000;
app.listen(3000, function () {
    console.log(`Listening on port: ${PORT}`);
});
