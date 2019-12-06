const mongoose = require("mongoose");
const { Post, User } = require("./models");
const buildMakeDbFunction = require("./functions");

const dbFunctions = buildMakeDbFunction();
const insertPost = dbFunctions.makeInsertPost(Post);
const getPost = dbFunctions.makeGetPost(Post);
const getPosts = dbFunctions.makeGetPosts(Post, 50);
const verifyPostLiked = dbFunctions.makeVerifyPostLiked(User);
const verifyPostDisliked = dbFunctions.makeVerifyPostDisliked(User);
const removePostFromLikes = dbFunctions.makeRemovePostFromLikes(User);
const removePostFromDislikes = dbFunctions.makeRemovePostFromDislikes(User);
const addPostToLikes = dbFunctions.makeAddPostToLikes(User);
const addPostToDislikes = dbFunctions.makeAddPostToDislikes(User);
const incPostLikes = dbFunctions.makeIncPostLikes(Post);
const incPostDislikes = dbFunctions.makeIncPostDislikes(Post);

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
  verifyPostDisliked,
  removePostFromLikes,
  removePostFromDislikes,
  addPostToLikes,
  addPostToDislikes,
  incPostLikes,
  incPostDislikes
});
