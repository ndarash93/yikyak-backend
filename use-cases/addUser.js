module.exports = function makeAddUser(insert, makeUser, getUser) {
  return async function addUser(httpRequest) {
    if (await getUser(httpRequest.body)) {
      throw new Error("User with that phone number already exists!");
    }
    const user = makeUser(httpRequest.body);
    return await insert({
      phoneNumber: user.getPhoneNumber(),
      dateCreated: user.getDateCreated(),
      dislikes: user.getDislikes(),
      likes: user.getLikes(),
      posts: user.getPosts()
    });
  };
};
