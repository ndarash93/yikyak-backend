const fs = require('fs');
const crypto = require('crypto');
fs.writeFile('./secret.js', `module.exports = \"${crypto.randomBytes(256).toString('hex')};\"`, (err) => {
  if (err) throw(err);
});
