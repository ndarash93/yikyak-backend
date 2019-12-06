module.exports = function makeLikePost({
  addPostToLikes,
  removePostFromLikes,
  removePostFromDislikes,
  incPostLikes,
  incPostDislikes,
  verifyPostLiked,
  verifyPostDisliked,
  getPost
}) {
  return async function likePost({ query, auth }) {
    const post = await getPost(query.postId);
    if(!post){
      const error = new Error('Post Not Found');
      error.code = 404;
      throw error;
    }
    if (await verifyPostLiked(query.postId, auth._id)) {
      await removePostFromLikes(query.postId, auth._id);
      return await incPostLikes(query.postId, -1);
    } else if (await verifyPostDisliked(query.postId, auth._id)) {
      await addPostToLikes(query.postId, auth._id);
      await removePostFromDislikes(query.postId, auth._id);
      await incPostDislikes(query.postId, -1);
      return await incPostLikes(query.postId, 1);
    } else {
      await addPostToLikes(query.postId, auth._id);
      return await incPostLikes(query.postId, 1);
    }
  };
};
