const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: String,
  description: String,
  picture: String,
  price: Number,
  serving_size: String,
  calories: Number
});

module.exports = itemSchema;

