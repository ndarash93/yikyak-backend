const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User', require('../../../models/user'));

router.get('/', (req, res) => {
  User.findOne({_id: req.auth.id}, ['dateCreated', 'email', '_id', 'likedPosts', 'dislikedPosts'], (err, user) => {
    if (err){
      res.status(500).json({message: err.message});
      throw err;
    }else{
      res.json({user: user});
    }
  });
});

router.post('/liked', (req, res) => {
  const timeStamp = new Date(req.body.timeStamp);
  User.findOne({_id: req.auth.id}, ['likedPosts'], (err, user) => {
    const posts = user.likedPosts.filter((post) => {
      if(post.timeStamp>=timeStamp){
        return post;
      }
    });
    res.json({posts: posts});
  });
});

router.post('/disliked', (req, res) => {
  const timeStamp = new Date(req.body.timeStamp);
  User.findOne({_id: req.auth.id}, ['dislikedPosts'], (err, user) => {
    const posts = user.likedPosts.filter((post) => {
      if(post.timeStamp>=timeStamp){
        return post;
      }
    });
    res.json({posts: posts});
  });
});

module.exports = router;