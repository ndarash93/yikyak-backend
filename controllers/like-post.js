module.exports = function makeLikePost(useLikePost) {
  return async function likePost(httpRequest){
    try{
      const liked = await useLikePost(httpRequest)
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 202,
        body: { liked }
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