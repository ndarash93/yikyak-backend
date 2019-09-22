const fs = require('fs');
const { Pool } = require('pg')

const poolConfig = {
  host: 'localhost',
  port: 5432,
  database: 'cookingwithfriends',
  user: 'nick',
  password: 'pepsi1',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

const pool = new Pool(poolConfig);

/*
const testPool = (req, res, next) => {
  req.pool = new Pool(poolConfig);
  next();
}
*/

const logger = (req, res, next) => {
    const date = new Date();
    const domain = 'https://nickdarash.com';

    fs.appendFile(
        '/home/pi/Documents/cookingWithFriends/logs/requests.log'
        , `${date.toString()}: ${req.method} request from ${req.ip} for ${domain}${req.url}\n`
        , (err) => {
            if (err) throw err;
    });
    next();
}

const errLogger = (err, req, res, next) => {
  const date = new Date();
    const domain = 'https://nickdarash.com';

    fs.appendFile(
      '/home/pi/Documents/cookingWithFriends/logs/err.log', 
      `${date.toString()}: err\n`
    )
    next();
}

const CORS = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = {
    logger: logger,
    errLogger: errLogger,
    Pool: pool,
    //testPool: testPool,
    CORS: CORS
};
