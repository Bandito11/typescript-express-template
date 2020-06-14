import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';

export function registerUser(opts: { username, password }) {
    let response = {
        success: false,
        error: null,
        data: null,
        dateStamp: new Date()
    }
    // Implement your own logic for Registering a user in DB
    response = {
        ...response,
        success: true,
        data: 'User was registered successfully'
    }
    return response;
}
/**
 * 
 * @param opts {username, password}
 */
export async function checkIfUserExists(opts: { username, password }) {
    let response = {
        success: false,
        error: null,
        data: null,
        dateStamp: new Date()
    }
    if (process.env.username != opts.username) {
        response = {
            ...response,
            success: false,
            error: 'User doesn\'t exist'
        }
        return response;
    }
    if (process.env.password != opts.password) {
        response = {
            ...response,
            success: false,
            error: 'Password was incorrect!'
        }
        return response;
    }
    const payload = {
        user: opts.username
    }
    const token = sign(payload, process.env.MSCOMP, {
        expiresIn: 1440
    });
    response = {
        ...response,
        success: true,
        data: token
    }
    return response;

}

export function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
    let token;
    let response = {
        success: false,
        error: null,
        data: undefined,
        dateStamp: new Date()
    };
    try {
        token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.slice(7, req.headers.authorization.length);
    } catch (error) {
        return {
            ...response,
            error: error
        }
    }
    if (token) {
        verify(token, process.env.MSCOMP, (error, decoded) => {
            if (error) {
                /**
                 * Possible errors as of 4/24/2018:
                 * JsonWebTokenError
                 * NotBeforeError
                 * TokenExpiredError
                 * 
                 * Error Params: name, message, expiredAt
                 */
                try {
                    response = {
                        ...response,
                        success: false,
                        error: error.name,
                        data: error.message
                    }
                } catch (error) {
                    response = {
                        ...response,
                        success: false,
                        error: 'Failed to authenticate token'
                    }
                }
                return res.send(response);
            }
            else {
                res.locals.decoded = decoded;
                req.params.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            data: 'No token provided.'
        });

    }
}
