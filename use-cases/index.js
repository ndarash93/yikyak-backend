const db = require('../database');
const makeAddPost = require('./addPost');
const makeLikePost = require('./likePost');
const makeGetPost = require('./getPost');

const makeAddUser = require('./addUser');

const addPost = makeAddPost(db.insertPost);
const likePost = makeLikePost(db.like);
const getPost = makeGetPost(db.getPost);
const addUser = makeAddUser(db.insertUser);

module.exports = Object.freeze({
  post: {
    addPost,
    likePost,
    getPost
  },
  user: {
    addUser
  }
});