module.exports = function makeRefreshTokens(useRefreshToken) {
  return async function refreshTokens(info) {
    try {
      const tokens = await useRefreshToken(info.body);
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200,
        body: {
          tokens
        }
      };
    } catch (e) {
      // TODO: Error logging
      //console.log(e)

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: e.code,
        body: {
          error: e.message
        }
      };
    }
  };
};
