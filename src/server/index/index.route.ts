import { Router } from 'express';
import { readFile } from 'fs';

const router = Router();

router.get('/', function (req, res, next) {
    // these are the paths of each folder to be used.
    const dirPages = `${__dirname.slice(0, __dirname.length - 5)}/www/index.html`;
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'charset': 'utf-8'
    });
    readFile(dirPages, function (err, data) {
        if (err) {
            res.status(500);
            console.error(err);
            res.end('Couldn\'t retrieve the page, please try again!');
        }
        res.end(data);
    });
});

module.exports = router;

