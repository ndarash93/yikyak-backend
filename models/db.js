const fs = require('fs');
const mongoose = require('mongoose');

const logLocation = '/home/nick/Server/yikyak/backend/Logs/';

const logger = (type, text) => {
  const date = new Date();
  const domain = 'https://nickdarash.com';
  const fileLocation = logLocation + 'mongoose.log';
  let logString = '';
  logString = `${date.toString()}: ${text}\n`;

  fs.appendFile(fileLocation, logString, (err) => {
    if (err) throw err;
  });
}

mongoose.connect('mongodb://localhost:27017/test', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'nick',
  pass: 'pepsi1'
});

const db = mongoose.connection;

db.on('error', (err) => {
  logger('ERROR', err)
});
db.on('open', _ => {
  logger('OPEN', 'Connection Open');
});
db.on('disconnected', _ => {
  logger('DISCONNECTED', 'Connection Closed');
});
module.exports = {
  db: db,
  logger: logger
};
