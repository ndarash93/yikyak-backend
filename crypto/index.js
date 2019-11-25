const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function compare(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function hash(password) {
  const salt = await bcrypt.getSalt(12);
  return await bcrypt.hash(password, salt);
}

function makeSign(secret, expiresIn) {
  return function sign(userData) {
    return jwt.sign(
      {
        iss: process.env.HOST,
        iat: Date.now(),
        id: userData._id,
        phoneNumber: userData.phoneNumber
      },
      secret,
      { expiresIn: expiresIn }
    );
  };
}

const signAccess = makeSign(process.env.ACCESS_TOKEN_SECRET, "1h");
const signRefresh = makeSign(process.env.REFRESH_TOKEN_SECRET, "5d");

module.exports = {
  signAccess,
  signRefresh,
  compare: compare,
  hash: hash
};
