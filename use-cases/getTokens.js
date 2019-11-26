module.exports = function makeGetToken(signAccess) {
  return async function getAccessTokens(user) {
    const accessToken = await signAccess(user);
    return accessToken;
  };
};
