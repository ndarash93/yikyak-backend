module.exports = function makeAddUser(
  makeUser,
  { getUser, insertUser, updateUserToken },
  { signAccess, signRefresh, hash }
) {
  return async function addUser(httpRequest) {
    if (await getUser(httpRequest.body)) {
      throw new Error("User with that phone number already exists!");
    }
    const user = makeUser(httpRequest.body);
    const newUser = await insertUser({
      phoneNumber: user.getPhoneNumber(),
      dateCreated: user.getDateCreated(),
      dislikes: user.getDislikes(),
      likes: user.getLikes(),
      posts: user.getPosts()
    });

    const accessToken = signAccess(newUser);
    const refreshToken = signRefresh(newUser);
    const hashedToken = await hash(refreshToken);

    updateUserToken(hashedToken, newUser);

    return {
      user: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  };
};
