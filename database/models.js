const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  text: String,
  likes: Number,
  dislikes: Number,
  timeStamp: { type: Date, default: new Date },
  location: String
});

const userSchema = mongoose.Schema({
  phoneNumber: String,
  posts: [{type: mongoose.Schema.Types.ObjectId}],
  likedPosts: [{type: mongoose.Schema.Types.ObjectId}],
  dislikedPosts: [{type: mongoose.Schema.Types.ObjectId}],
  refreshToken: String
})

const model = Object.freeze({
  Post: mongoose.model('Post', postSchema),
  User: mongoose.model('User', userSchema)
})

module.exports = model;