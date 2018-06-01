import { Request, Response, NextFunction } from 'express';
// import { sign, verify } from 'jsonwebtoken';
// const { Client } = require('pg');

export async function checkAuthentication(opts: { username, password }) {
    // const text = 'Select username from users where username = $1 and password = $2';
    // const values = [opts.username, opts.password];
    // const client = new Client({
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: true
    // });
    // let res;
    // try {
    //     await client.connect();
    //     res = await client.query(text, values);
    //     await client.end();
    // } catch (error) {
    //     return {
    //         success: false,
    //         token: null,
    //         data: error
    //     };

    // }
    // if (res.rows.length > 0) {
    //     const payload = {
    //         user: res.rows[0]
    //     };
    //     const token = sign(payload, process.env.MSCOMP, {
    //         expiresIn: 1440
    //     });
    //     return {
    //         success: true,
    //         token: token
    //     }
    // } else {
    //     return {
    //         success: false,
    //         token: null,
    //         data: 'User doesn\'t exists'
    //     };
    // }
}


export function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
    // let token;
    // try {
    //     token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.slice(7, req.headers.authorization.length);
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
    // if (token) {
    //     verify(token, process.env.MSCOMP, (error, decoded) => {
    //         if (error) {
    //             return res.json({ success: false, data: 'Failed authentication!' });
    //         } else {
    //             res.locals.decoded = decoded;
    //             req.params.decoded = decoded;
    //             next();
    //         }
    //     });
    // } else {
    //     return res.status(403).send({
    //         success: false,
    //         data: 'No token provided.'
    //     });

    // }
}