module.exports = function makeLikePost({
  addPostToLikes,
  removePostFromLikes,
  removePostFromDislikes,
  incPostLikes,
  verifyPostLiked,
  verifyPostDisliked
}) {
  return async function likePost({ query, auth }) {
    if (await verifyPostLiked(query.postId, auth._id)) {
      await removePostFromLikes(query.postId, auth._id);
      return await incPostLikes(query.postId, -1);
    } else if (await verifyPostDisliked(query.postId, auth._id)) {
      await addPostToLikes(query.postId, auth._id);
      await removePostFromDislikes(query.postId, auth._id);
      return await incPostLikes(query.postId, 2);
    } else {
      await addPostToLikes(query.postId, auth._id);
      return await incPostLikes(query.postId, 1);
    }
  };
};
