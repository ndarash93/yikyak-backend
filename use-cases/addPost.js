module.exports = function makeAddPost(
  { insertPost, getUser },
  { verifyAccess },
  makePost
) {
  return async function addPost({ body }) {
    const userClaim = await verifyAccess(body.accessToken);
    const user = await getUser(userClaim);

    const post = makePost(body, user);
    return await insertPost({
      user: post.getAuthor(),
      timeStamp: post.getTimeStamp(),
      text: post.getText(),
      likes: post.getLikes(),
      dislikes: post.getDislikes()
    });
  };
};
