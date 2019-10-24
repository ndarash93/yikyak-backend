const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Post = mongoose.model('Post', require('../../../models/post'));

router.post('/', (req, res) => {
  const post = new Post({
    text: req.body.postText,
    likes: 0,
    timeStamp: new Date,
    location: 'At Home'
  });
  post.save((err, post) => {
    if (err) throw err;
    res.status(200).json({post: post});
  });
});

router.delete('/', (req, res) => {
  Post.findOneAndDelete({
    _id: req.body.id
  }, (err, post) => {
    if (err) {
      res.status(500).json({message: 'An internal error occurred', errMessage: err.message});
      throw err;
    }
    res.json({post: post});
  });
});

module.exports = router;