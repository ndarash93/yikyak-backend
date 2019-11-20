const mongoose = require('mongoose');
const { Post, User } = require('./models');
const buildMakeDbFunction = require('./functions');

const dbFunctions = buildMakeDbFunction();
const insertPost = dbFunctions.makeInsertPost(Post);
const getPost = dbFunctions.makeGetPost(Post);
const getPosts = dbFunctions.makeGetPosts(Post, 50);

const insertUser = dbFunctions.user.makeInsertUser(User);

mongoose.connect('mongodb://127.0.0.1:27017/yikyak-clean', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  //user: 'nick',
  //pass: 'pepsi1'
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.on('open', _ => {
  console.log(`mongodb://127.0.0.1:27017/yikyak connected`);
});
db.on('disconnected', _ => {
  console.log('Disconnected');
});

module.exports = Object.freeze({
  insertPost,
  getPosts,
  getPost,
  insertUser
})