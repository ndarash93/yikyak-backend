const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Post = mongoose.model('Post', require('../../../models/post'));


router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.json({posts: posts});
  });
});

module.exports = router;