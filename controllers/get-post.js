module.exports = function makeGetPost(useGetPost) {
  return async function addPost(httpRequest){
    try{
      const post = await useGetPost(httpRequest);
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(post.timeStamp).toUTCString()
        },
        statusCode: 200,
        body: { post }
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