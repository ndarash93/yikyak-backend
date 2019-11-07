module.exports = function makeLikePost(like) {
  return async function addPost(info){
    //const post = makePost(postInfo.body);
    return await like({
      _id: info.params.id
    });
  }
}