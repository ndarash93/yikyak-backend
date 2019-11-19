module.exports = function makeAuthUser(useAuthUser) {
  return async function addPost(postInfo){
    try{
      const user = await useAuthUser(userInfo)
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(posted.modifiedOn).toUTCString()
        },
        statusCode: 201,
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