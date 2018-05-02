import { Request, Response, NextFunction } from 'express';



/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        if(token == '123'){
            res.send('token validated')
        }
    } else {
        return res.status(403).send('token error');
    }
}