module.exports = function makePost(postInfo, user){
  const post = {
    author: user._id,
    timeStamp: new Date(),
    text: postInfo.text,
    likes: 0,
    dislikes: 0
  }

  if(!post.author){
    throw new Error('Post must contain an author');
  }

  if(post.text.length < 1){
    throw new Error('Post must contatin at least one character');
  }

  if(post.text.length > 500){
    throw new Error('Post cannot be longer than 500 characters');
  }

  if(post.likes < 0){
    throw new Error('Post cannot have negative likes');
  }

  if(post.dislikes < 0){
    throw new Error('Post cannot have negative dislikes');
  }


  return Object.freeze({
    getAuthor: () => {return post.author},
    getTimeStamp: () => {return post.timeStamp},
    getText: () => {return post.text},
    getLikes: () => {return post.likes},
    getDislikes: () => {return post.dislikes}
  });
}