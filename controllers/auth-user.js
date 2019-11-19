module.exports = function makeAuthUser(useAuthUser) {
  return async function authUser(userInfo){
    try{
      const user = await useAuthUser(userInfo)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          user
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
        statusCode: 403,
        body: {
          error: e.message
        }
      }
    }
  }
}