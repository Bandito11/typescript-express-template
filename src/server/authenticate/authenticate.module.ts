import { Request, Response, NextFunction } from 'express';



export function checkAuthentication(){
// const text = 'Select username from users where username = $1 and password = $2';
// const values = [opts.username, opts.password];
// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
// });
// await client.connect();
// const res = await client.query(text, values);
// await client.end();
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

}

export function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
    //     const key = req.headers.authorization.slice(7, req.headers.authorization.length);
    // const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // if (token) {
    //     if(token == '123'){
    //         res.send('token validated')
    //     }
    // } else {
    //     return res.status(403).send('token error');
    // }
}