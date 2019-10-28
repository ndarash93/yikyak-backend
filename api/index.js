const express = require('express');
const router = express.Router();
const private = require('./private/index');
const public = require('./public/index');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../secret/secret');
const joi = require('@hapi/joi');

const User = mongoose.model('User', require('../models/user'));

router.use('/private', private);
router.use('/public', public);


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
          }, secret, {expiresIn: '365d'})
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
        email: req.body.email,
        password: hash,
        date: new Date
      });
      user.save((err => {
        if (err) return res.status(500).json({'error': 'An internal server error occurred'});
        res.status(200).json({
          'email': user.email,
          'id': user._id,
          'jwt': jwt.sign({
            'email': user.email,
            'id': user._id,
            'iss': 'nickdarash.com'
          }, secret, {expiresIn: '365d'})
        });
      }));
    });
  });
});

router.post('/test', (req, res) => {
  const joiSchema = joi.object({
    username: joi.string().alphanum().min(4).max(50).required(),
    password: joi.string().pattern(/^[a-zA-Z0-9]{4,30}$/),
    repeatPassword: joi.ref('password'),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  });
  if(joiSchema.validate({
    username: req.body.username,
    password: req.body.password,
    repeatPassword: req.body.repeatPassword,
    email: req.body.email
  })){
    res.status(200).json({'test': 'test'});
  }else{
    res.status(400).json({'ErrorMessage': 'Bad Request'});
  }
});


module.exports = router;