const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: String,
  likes: Number
});

module.exports = commentSchema;