const jwt = require('jsonwebtoken');

function makeSign(secret, expiresIn){
  return function sign(userData){
    return jwt.sign({
      iss: process.env.HOST,
      iat: Date.now(),
      id: userData._id,
      phoneNumber: userData.phoneNumber
    }, secret, {expiresIn: expiresIn});
  }
}

const signAccess = makeSign(process.env.ACCESS_TOKEN_SECRET, '1h');
const signRefresh = makeSign(process.env.REFRESH_TOKEN_SECRET, '5d');

module.exports = {
  signAccess,
  signRefresh
}