import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/logging';

const NAMESPACE = 'Server';
const router = express();

/** Logging the request */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}, IP - [${req.socket.remoteAddress}]]`);

    res.on(`finish`, () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}, IP - [${req.socket.remoteAddress}]], STATUS - [${res.statusCode}]`);
    });
});

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

/** Rules of API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept, Authorization');
    
    if(req.method == `OPTIONS`)
    {
        res.header('Access-Control-Allow-Methods', `GET PATCH DELETE POST PUT`);
        return res.status(200).json({});
    }
});

/** Routes */