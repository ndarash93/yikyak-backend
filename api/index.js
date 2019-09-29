const express = require('express');
const router = express.Router();
const private = require('./private/index');
const public = require('./public/index');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User', require('../models/user'));

router.use('/private', private);
router.use('/public', public);

mongoose.connect('mongodb://localhost:27017/test', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

router.post('/auth', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) return res.status(500).json({'error': 'An internal server error occurred'});
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(500).json({'error': 'An internal error occurred'});
      if (result) { 
        res.status(200).json({
          'username': user.username,
          'email': user.email,
          'id': user._id,
          'jwt': jwt.sign({
            'username': user.username,
            'id': user._id,
            'iss': 'nickdarash.com'
          }, 'secret', {expiresIn: '1h'})
        });
      } else{
        res.status(401).json({
          'message': 'Username or Password are incorrect'
        });
      }
    });
  });
});

router.post('/register', (req, res) => {
  bcrypt.genSalt(14, (err, salt) => {
    if (err) return res.status(500).json({'error': 'An internal server error occurred'});
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.status(500).json({'error': 'An internal server error occurred'});
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save((err => {
        if (err) return res.status(500).json({'error': 'An internal server error occurred'});
        res.status(200).json({
          'username': user.username,
          'email': user.email,
          'id': user._id,
          'jwt': jwt.sign({
            'username': user.username,
            'id': user._id,
            'iss': 'nickdarash.com'
          }, 'secret', {expiresIn: '1h'})
        });
      }));
    });
  });
});

module.exports = router;