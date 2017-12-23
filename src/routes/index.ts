import { Router } from 'express';

const router = Router();

router.get('/', async function (req, res, next) {
    res.sendFile(path.join(__dirname, './www','index.html'));
});

module.exports = router;

