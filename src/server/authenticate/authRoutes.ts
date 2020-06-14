import { Router, Request, Response } from 'express';
import { checkIfUserExists, registerUser } from './authenticate.module'
const router = Router();

router.post('/', authenticate);
async function authenticate(req: Request, res: Response) {
    const username = req.headers.username;
    const password = req.headers.password;
    const response = await checkIfUserExists({ username: username, password: password });
    if (response.success) {
        res.send(response)
    } else {
        res.send(response);
    }
}

router.post('/register', register);

async function register(req: Request, res: Response) {
    const username = req.headers.username;
    const password = req.headers.password;
    const response = await registerUser({ username: username, password: password });
    try {
        res.send(response)
    } catch (error) {
        res.send(error);
    }
}

module.exports = router;
