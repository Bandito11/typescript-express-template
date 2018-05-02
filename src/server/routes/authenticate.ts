import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', authenticate);
async function authenticate(req: Request, res: Response) {
    const key = req.headers.authorization.slice(7, req.headers.authorization.length);
    try {
        if (key == '123')
            res.send('authorized');
    } catch (error) {
        res.send(error);
    }
}

module.exports = router;