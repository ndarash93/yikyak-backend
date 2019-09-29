const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  test: []
});

const testSchema = new mongoose.Schema({
  test1: String,
  test2: String
})

module.exports = {
  userSchema: userSchema,
  testSchema: testSchema
};