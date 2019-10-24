const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Post = mongoose.model('Post', require('../../../models/post'));


router.get('/', (req, res) => {
  Post.find({}, (err, result) => {
    res.json({result: result});
  });
});

module.exports = router;