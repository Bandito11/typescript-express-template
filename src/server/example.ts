
import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

router.get('/message/:message', example);
function example(req: Request, res: Response, next: NextFunction) {
    const message = req.params.message;
    const echoMessage = `Echo Message: ${message}`;;
    res.send(echoMessage);
}

module.exports = router;
