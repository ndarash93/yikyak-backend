module.exports = function makeRefreshTokens(
  { signAccess, signRefresh, compare, verifyRefresh, hash },
  { getUser, updateUserToken }
) {
  return async function refreshTokens({ refreshToken }) {
    const tokenData = verifyRefresh(refreshToken);
    const user = await getUser(tokenData);
    const tokensMatch = await compare(refreshToken, user.token);

    if (!user) {
      const error = new Error("Token Data Invalid");
      error.code = 403;
      throw error;
    }

    if(!tokensMatch){
      const error = new Error('Token Data Does Not Match');
      error.code = 403;
      throw error;
    }
    
    const accessToken = signAccess(user);
    const newRefreshToken = signRefresh(user);

    await updateUserToken(await hash(newRefreshToken), user);

    return Object.freeze({
      id: user._id,
      phoneNumber: user.phoneNumber,
      accessToken: accessToken,
      refreshToken: newRefreshToken
    });
  };
};
