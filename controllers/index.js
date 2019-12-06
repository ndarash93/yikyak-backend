const makeAddPost = require("./add-post");
const makeLikePost = require("./like-post");
const makeDislikePost = require('./dislike-post');
const makeGetPost = require("./get-post");
const makeGetPosts = require("./get-posts");

const makeAddUser = require("./add-user");
const makeRefreshTokens = require("./refresh-tokens");

const service = require("../use-cases");

const addPost = makeAddPost(service.post.addPost);
const likePost = makeLikePost(service.post.likePost);
const dislikePost = makeDislikePost(service.post.dislikePost);
const getPost = makeGetPost(service.post.getPost);
const getPosts = makeGetPosts(service.post.getPosts);

const addUser = makeAddUser(service.user.addUser);
const refreshTokens = makeRefreshTokens(service.user.refreshTokens);

module.exports = Object.freeze({
  post: {
    addPost,
    likePost,
    dislikePost,
    getPost,
    getPosts
  },
  user: {
    addUser,
    refreshTokens
  }
});
