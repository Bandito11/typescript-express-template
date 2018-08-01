import { Router, Request, Response } from 'express';
import { echo } from './example.module';
const router = Router();

router.get('/message/:message', example);
async function example(req: Request, res: Response) {
    const message = req.params.message;
    const echoMessage = echo(message);
    res.send(echoMessage);
}

module.exports = router;