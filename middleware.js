const fs = require('fs');

const logger = (req, res, next) => {
    const date = new Date();
    const domain = 'http://nickdarash.com';

    fs.appendFile(
        '/home/pi/Documents/cookingWithFriends/logs/requests.log'
        , `${date.toString()}: ${req.method} request from ${req.ip} for ${domain}${req.url}\n`
        , (err) => {
            if (err) throw err;
    });
    next();
}

module.exports = logger;
