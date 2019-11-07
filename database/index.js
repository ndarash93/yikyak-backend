const mongoose = require('mongoose');
const { Post } = require('./models');

mongoose.connect('mongodb://127.0.0.1:27017/yikyak-clean', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  //user: 'nick',
  //pass: 'pepsi1'
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.on('open', _ => {
  console.log(`mongodb://127.0.0.1:27017/yikyak connected`);
});
db.on('disconnected', _ => {
  console.log('Disconnected');
});

const insert = async function(postInfo){
  const post = new Post({...postInfo});
  return await post.save();
}

module.exports = Object.freeze({
  insert
})