import { Router } from 'express';

const router = Router();

router.get('/', function (req, res, next) {
    res.send('Hi from node');
});

module.exports = router;

