const makeAddPost = require('./add-post');
const makeLikePost = require('./like-post');
//const db = require('../db');
const service = require('../use-cases');

const addPost = makeAddPost(service.post.addPost);
const likePost = makeLikePost(service.post.likePost);

const controller = Object.freeze({
  post: {
    addPost,
    likePost
  },
  user: {
    //addUser
  }
})

module.exports = controller;