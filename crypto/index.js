const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function compare(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function hash(password) {
  return await bcrypt.hash(password, 12);
}

function makeSign(secret, expiresIn) {
  return function sign({ _id, phoneNumber }) {
    return jwt.sign(
      {
        iss: process.env.HOST,
        iat: Date.now(),
        _id: _id,
        phoneNumber: phoneNumber
      },
      secret,
      { expiresIn: expiresIn }
    );
  };
}

function makeVerify(secret) {
  return function verify(token) {
    return jwt.verify(token, secret);
  };
}

const signAccess = makeSign(process.env.ACCESS_TOKEN_SECRET, "1h");
const signRefresh = makeSign(process.env.REFRESH_TOKEN_SECRET, "5d");

const verifyAccess = makeVerify(process.env.ACCESS_TOKEN_SECRET);
const verifyRefresh = makeVerify(process.env.REFRESH_TOKEN_SECRET);

module.exports = {
  signAccess,
  signRefresh,
  compare,
  hash,
  verifyAccess,
  verifyRefresh
};
