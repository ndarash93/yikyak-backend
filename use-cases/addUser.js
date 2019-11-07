const {makeUser} = require('../entities');

module.exports = function makeAddUser(insert) {
  return async function addUser(userInfo){
    const user = makePost(userInfo.body);
    return await insert({
      phoneNumber: post.getPhoneNumber(),
      dateCreated: post.getDateCreated(),
      dislikes: post.getDislikes(),
      likes: post.getLikes(),
      posts: getPosts()
    });
  }
}