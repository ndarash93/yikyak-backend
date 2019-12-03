module.exports = function makeRefreshTokens(
  { signAccess, signRefresh, compare, decode },
  { findUser, updateUserToken }
) {
  return async function refreshTokens({ refreshToken }) {
    console.log("test");
    const tokenData = decode(refreshToken);
    const user = await findUser(tokenData.id);
    if (!user) {
      const error = new Error("Token Data Invalid");
      error.code = 403;
      throw error;
    }
    const accessToken = signAccess(user);
    const refreshToken = signRefresh(user);

    if (!compare(refreshToken, user.token)) {
      const error = new Error("Token Data Invalid");
      error.code = 403;
      throw error;
    }

    await updateUserToken(refreshToken, user);

    return Object.freeze({
      id: user._id,
      phoneNumber: user.phoneNumber,
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  };
};
