const fs = require('fs');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const secret = require('./secret/secret');
const jwt = require('jsonwebtoken');

const logLocation = '/home/nick/Server/yikyak/backend/Logs/';

const logger = (req, res, next) => {
    const date = new Date();
    const domain = 'https://nickdarash.com';
    const fileLocation = logLocation + 'requests.log';
    let logString = '';
    if(req.body.id){
      logString = `${date.toString()}: ${req.method} request from ${req.body.id} at ${req.ip} for ${domain}${req.url}\n`;
    }else{
      logString = `${date.toString()}: ${req.method} request from ${req.ip} for ${domain}${req.url}\n`;
    }
    fs.appendFile(fileLocation, logString, (err) => {
      if (err) next(err);
    });
    next();
}

const errLogger = (err, req, res, next) => {
  const date = new Date();
    const domain = 'https://nickdarash.com';

    fs.appendFile(
      logLocation + 'error.log',
      `${date.toString()}: ${err.message}\n`
    )
    next();
}

const CORS = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

const verify = (req, res, next) => {
  jwt.verify(req.headers.jwt, secret, (err, decoded) => {
    if (err) { 
      res.status(401).json({
        'errorMessage': err.message
      });
    }
    else{
      req.body.auth = true;
      req.body.id = decoded.id;
      next();
    }
  });
}

module.exports = {
  logger: logger,
  errLogger: errLogger,
  verify: verify,
  CORS: CORS
};
