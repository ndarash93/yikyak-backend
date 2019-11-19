module.exports = function makeAddPost(insert, makePost) {
  return async function addPost(postInfo){
    const post = makePost(postInfo.body);
    return await insert({
      user: post.getAuthor(),
      timeStamp: post.getTimeStamp(),
      text: post.getText(),
      likes: post.getLikes(),
      dislikes: post.getDislikes()
    });
  }
}