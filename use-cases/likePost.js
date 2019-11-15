module.exports = function makeLikePost(
  addPostToLikes, 
  removePostFromLikes, 
  removePostFromDislikes, 
  incPostLikes, 
  verifyPostLiked,
  verifyPostDisliked
  ) {
  return async function likePost(httpRequest){
    if(await verifyPostLiked(httpRequest.query.postId, httpRequest.auth.id)){
      await removePostFromLikes(httpRequest.query.postId, httpRequest.auth.id);
      await incPostLikes(httpRequest.query.postId, -1);
    }else if(verifyPostDisliked(httpRequest.query.postId, httpRequest.auth.id)){
      await addPostToLikes(httpRequest.query.postId, httpRequest.auth.id);
      await removePostFromDislikes(httpRequest.query.postId, httpRequest.auth.id);
      await incPostLikes(httpRequest.query.postId, 2);
    }else{
      await addPostToLikes(httpRequest.query.postId, httpRequest.auth.id);
      await incPostLikes(httpRequest.query.postId, 1);
    }
  }
}