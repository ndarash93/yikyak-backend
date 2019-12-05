const db = require("../database");
const crypto = require("../crypto");
const { makePost, makeUser } = require("../entities");

const makeAddPost = require("./addPost");
const makeLikePost = require("./likePost");
const makeGetPost = require("./getPost");

const makeAddUser = require("./addUser");
const makeAuthUser = require("./authUser");

const makeRefreshTokens = require("./refreshTokens");

const addPost = makeAddPost(db, crypto, makePost);
const likePost = makeLikePost(db);
const getPost = makeGetPost(db.getPost);

const addUser = makeAddUser(makeUser, db, crypto);
const authUser = makeAuthUser(db.getUser, crypto.compare);

const refreshTokens = makeRefreshTokens(crypto, db);

module.exports = Object.freeze({
  post: {
    addPost,
    likePost,
    getPost
  },
  user: {
    addUser,
    authUser,
    refreshTokens
  }
});
