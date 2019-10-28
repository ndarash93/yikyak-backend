const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User', require('../../../models/user'));

router.get('/', (req, res) => {
  User.findOne({_id: req.auth.id}, (err, user) => {
    if (err){
      res.status(500).json({message: err.message});
      throw err;
    }else{
      res.json({user: user});
    }
  });
});

module.exports = router;