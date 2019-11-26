module.exports = function makeAddUser(useAddUser) {
  return async function addUser(userInfo) {
    try {
      const user = await useAddUser(userInfo);
      const accessToken = getToken();
      const refreshToken = getToken();
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 201,
        body: {
          phoneNumber: user.phoneNumber,
          id: user._id,
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      };
    } catch ({ statusCode = 400, ...e }) {
      // TODO: Error logging
      //console.log(e)

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: statusCode,
        body: {
          error: e.message
        }
      };
    }
  };
};
