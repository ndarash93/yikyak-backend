module.exports = function makeDislikePost(useDislikePost) {
  return async function likePost(httpRequest){
    try{
      const disliked = await useDislikePost(httpRequest)
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 202,
        body: { disliked }
      }
    }
    catch (e) {
      // TODO: Error logging
      //console.log(e)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: e.code,
        body: {
          error: e.message
        }
      }
    }
  }
}