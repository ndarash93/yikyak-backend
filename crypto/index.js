const bcrypt = require('bcryptjs');

async function compare(password, hash){
  return await bcrypt.compare(password, hash);
}

async function hash(password){
  const salt = await bcrypt.getSalt(12);
  return await bcrypt.hash(password, salt);
}

module.exports = Object.freeze({
  compare: compare,
  hash: hash
});