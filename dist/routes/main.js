"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', async function (req, res, next) {
    res.send('Hi from node');
});
module.exports = router;
