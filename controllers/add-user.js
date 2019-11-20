module.exports = function makeAddUser(useAddUser) {
  return async function addUser(userInfo){
    try{
      const user = await useAddUser(userInfo);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: {
          phoneNumber: user.phoneNumber,
          id: user._id
        }
      }
    }
    catch (e) {
      // TODO: Error logging
      //console.log(e)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}