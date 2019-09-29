const fs = require('fs');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
//const JwtStrategy = require('passport-jwt').Strategy
//const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const logger = (req, res, next) => {
    const date = new Date();
    const domain = 'https://nickdarash.com';

    fs.appendFile(
        '/home/nick/Server/whatsForDinner/whatsForDinner-backend/Logs/requests.log', 
        `${date.toString()}: ${req.method} request from ${req.ip} for ${domain}${req.url}\n`,
        (err) => {
            if (err) next(err);
    });
    next();
}

const errLogger = (err, req, res, next) => {
  const date = new Date();
    const domain = 'https://nickdarash.com';

    fs.appendFile(
      '/home/nick/Server/whatsForDinner/whatsForDinner-backend/Logs/error.log',
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
  if(req.headers.jwt){
    jwt.verify(req.headers.jwt, 'secret', (err, decoded) => {
      console.log(req.headers.jwt);
      if (err) { 
        console.log(err.message);
        res.status(401).json({
          'errorMessage': err.message
        });
      }
      else{
        console.log(decoded);
        req.body.auth = true;
        req.body.id = decoded.id;
        next();
      }
    });
  }else{
    req.body.auth = false;
    next();
  }
}

module.exports = {
    logger: logger,
    errLogger: errLogger,
    verify: verify,
    CORS: CORS
};
