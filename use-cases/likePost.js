module.exports = function makeLikePost({
  addPostToLikes, 
  removePostFromLikes, 
  removePostFromDislikes, 
  incPostLikes, 
  verifyPostLiked,
  verifyPostDisliked
}) {
  return async function likePost({query, body}){
    if(await verifyPostLiked(query.postId, body.id)){
      await removePostFromLikes(query.postId, body.id);
      await incPostLikes(query.postId, -1);
    }else if(verifyPostDisliked(query.postId, body.id)){
      await addPostToLikes(query.postId, body.id);
      await removePostFromDislikes(query.postId, body.id);
      await incPostLikes(query.postId, 2);
    }else{
      await addPostToLikes(query.postId, body.id);
      await incPostLikes(query.postId, 1);
    }
  }
}