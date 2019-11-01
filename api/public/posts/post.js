const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Post = mongoose.model('Post', require('../../../models/post'));


router.get('/', (req, res) => {
  Post.find({}, ['user', '_id', 'timeStamp', 'likes', 'text'],
    {
      skip: 0,
      limit: 50,
      sort: {
        timeStamp: -1
      }
    },
    (err, posts) => {
    res.json({posts: posts});
  });
});

module.exports = router;