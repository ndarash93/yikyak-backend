module.exports = function makeAddUser(
  insert,
  makeUser,
  getUser,
  signAccess,
  signRefresh
) {
  return async function addUser(httpRequest) {
    if (await getUser(httpRequest.body)) {
      throw new Error("User with that phone number already exists!");
    }
    const user = makeUser(httpRequest.body);
    const accessToken = await signAccess(user);
    const refreshToken = await signRefresh(user);
    return await insert({
      phoneNumber: user.getPhoneNumber(),
      dateCreated: user.getDateCreated(),
      dislikes: user.getDislikes(),
      likes: user.getLikes(),
      posts: user.getPosts()
    });
  };
};
