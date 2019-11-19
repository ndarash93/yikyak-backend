const db = require('../database');
const crypto = require('../crypto');
const {makePost, makeUser} = require('../entities')

const makeAddPost = require('./addPost');
const makeLikePost = require('./likePost');
const makeGetPost = require('./getPost');

const makeAddUser = require('./addUser');
const makeAuthUser = require('./authUser');

const addPost = makeAddPost(db.insertPost, makePost);
const likePost = makeLikePost(db.like);
const getPost = makeGetPost(db.getPost);

const addUser = makeAddUser(db.insertUser, makeUser);
const authUser = makeAuthUser(db.getUser, crypto.compare);

module.exports = Object.freeze({
  post: {
    addPost,
    likePost,
    getPost
  },
  user: {
    addUser,
    authUser
  }
});