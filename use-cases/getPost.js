module.exports = function makeGetPost(dbGetPost) {
  return async function getPost(httpRequest){
    return await dbGetPost(httpRequest.query.id);
  }
}