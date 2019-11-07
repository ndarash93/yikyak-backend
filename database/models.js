const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  text: String,
  likes: Number,
  dislikes: Number,
  timeStamp: { type: Date, default: new Date },
  location: String
});

const model = Object.freeze({
  Post: mongoose.model('Post', postSchema)
})

module.exports = model;