module.exports = function makeAddUser(insert, makeUser, getUser, signAccessToken, signRefreshToken, hash) {
  return async function addUser(httpRequest) {
    if (await getUser(httpRequest.body)) {
      throw new Error("User with that phone number already exists!");
    }
    
    const user = makeUser(httpRequest.body);
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const newUser = await insert({
      phoneNumber: user.getPhoneNumber(),
      dateCreated: user.getDateCreated(),
      dislikes: user.getDislikes(),
      likes: user.getLikes(),
      posts: user.getPosts(),
      token: hash(refreshToken)
    });
    return {
      newUser,
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  };
};