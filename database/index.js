const mongoose = require("mongoose");
const { Post, User } = require("./models");
const buildMakeDbFunction = require("./functions");

const dbFunctions = buildMakeDbFunction();
const insertPost = dbFunctions.makeInsertPost(Post);
const getPost = dbFunctions.makeGetPost(Post);
const getPosts = dbFunctions.makeGetPosts(Post, 50);
const verifyPostLiked = dbFunctions.makeVerifyPostLiked(User);
const removePostFromLikedPosts = dbFunctions.makeRemovePostFromLikedPosts(User);
const addPostToLikedPosts = dbFunctions.makeAddPostToLikedPosts(User);
const incPostLikes = dbFunctions.makeIncPostLikes(Post);

const insertUser = dbFunctions.user.makeInsertUser(User);
const getUser = dbFunctions.user.makeGetUser(User);
const updateUserToken = dbFunctions.user.makeUpdateUserToken(User);

mongoose.connect(`${process.env.DB_HOST}${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  //user: 'nick',
  //pass: 'pepsi1'
});

const db = mongoose.connection;
db.on("error", err => {
  console.log(err);
});
db.on("open", _ => {
  console.log(`${process.env.DB_HOST}${process.env.DB_NAME}`);
});
db.on("disconnected", _ => {
  console.log("Disconnected");
});

module.exports = Object.freeze({
  insertPost,
  getPosts,
  getPost,
  insertUser,
  getUser,
  updateUserToken,
  verifyPostLiked,
  removePostFromLikedPosts,
  addPostToLikedPosts,
  incPostLikes
});
