module.exports = function makeGetPost(getPost) {
  return async function getPost(httpRequest){
    return await getPost(httpRequest.params.id);
  }
}