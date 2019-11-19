module.exports = function makeAddUser(insert, makeUser) {
  return async function addUser(httpRequest){
    const user = makeUser(httpRequest.body);
    return await insert({
      phoneNumber: user.getPhoneNumber(),
      dateCreated: user.getDateCreated(),
      dislikes: user.getDislikes(),
      likes: user.getLikes(),
      posts: user.getPosts()
    });
  }
}