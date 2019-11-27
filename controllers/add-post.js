module.exports = function makeAddPost(useAddPost) {
  return async function addPost(postInfo) {
    try {
      const posted = await useAddPost(postInfo);
      return {
        headers: {
          "Content-Type": "application/json",
          Uploaded: new Date().toUTCString()
        },
        statusCode: 201,
        body: { posted }
      };
    } catch (e) {
      // TODO: Error logging
      //console.log(e)

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
};
