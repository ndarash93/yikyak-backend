module.exports = function makeGetPosts(useGetPosts) {
  return async function getPosts(httpRequest){
    try{
      const posts = await useGetPosts(httpRequest);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: { posts }
      }
    }
    catch (e) {
      // TODO: Error logging
      //console.log(e)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 404,
        body: {
          error: e.message
        }
      }
    }
  }
}