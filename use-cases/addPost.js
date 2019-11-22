module.exports = function makeAddPost(insert, makePost, getUser) {
  return async function addPost(postInfo){
    const user = await getUser(postInfo.body);

    const post = makePost(postInfo.body, user);
    return await insert({
      user: post.getAuthor(),
      timeStamp: post.getTimeStamp(),
      text: post.getText(),
      likes: post.getLikes(),
      dislikes: post.getDislikes()
    });
  }
}