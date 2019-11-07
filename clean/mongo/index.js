import { makePostDB } from './post-db';
import mongoose from 'mongoose';

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

export default db;