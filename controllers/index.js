const makeAddPost = require('./add-post');
const makeLikePost = require('./like-post');
const makeGetPost = require('./get-post');
const makeGetPosts = require('./get-posts');

const service = require('../use-cases');

const addPost = makeAddPost(service.post.addPost);
const likePost = makeLikePost(service.post.likePost);
const getPost = makeGetPost(service.post.getPost);
const getPosts = makeGetPosts(service.post.getPosts)

const controller = Object.freeze({
  post: {
    addPost,
    likePost,
    getPost,
    getPosts
  },
  user: {
    //addUser
  }
})

module.exports = controller;