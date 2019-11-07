const makeAddPost = require('./add-post');
const makeLikePost = require('./like-post');
const makeGetPost = require('./get-post');
//const db = require('../db');
const service = require('../use-cases');

const addPost = makeAddPost(service.post.addPost);
const likePost = makeLikePost(service.post.likePost);
const getPost = makeGetPost(service.post.getPost)

const controller = Object.freeze({
  post: {
    addPost,
    likePost,
    getPost
  },
  user: {
    //addUser
  }
})

module.exports = controller;