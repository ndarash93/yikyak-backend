const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  text: String,
  likes: Number,
  timeStamp: { type: Date, default: new Date },
  location: String
});

module.exports = postSchema;