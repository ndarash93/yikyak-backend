module.exports = function makeGetPost(getPost) {
  return async function addPost(httpRequest){
    return await getPost(httpRequest.body.id);
  }
}