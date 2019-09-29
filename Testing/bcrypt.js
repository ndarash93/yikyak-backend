const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('user', require('./mongoose'));

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  user: 'nick',
  pass: 'pepsi1'
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});
db.on('open', _ => {
  console.log('Success!');
});
db.on('disconnected', _ => {
  console.log('Disconnected');
});

User.findOne({}, (err, user) => {
  console.log(user);
  bcrypt.compare('#WCne6425', user.password, (err, res) => {
    console.log(res);
  });
});

