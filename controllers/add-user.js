module.exports = function makeAddUser(useAddUser) {
  return async function addUser(userInfo) {
    try {
      const { user, accessToken, refreshToken } = await useAddUser(userInfo);
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 201,
        body: {
          phoneNumber: user.phoneNumber,
          _id: user._id,
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      };
    } catch ({ message = "An Internal Error Occurred", ...e }) {
      // TODO: Error logging
      //console.log(e)

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: e.code,
        body: {
          error: message
        }
      };
    }
  };
};
