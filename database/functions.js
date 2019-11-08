module.exports = function buildMakeFunctions(){
  
  
  const makeInsertPost = function (Post){
    return async function insert(postInfo){
      const post = new Post({...postInfo});
      return await post.save();
    }
  }

  const makeGetPost = function(Post){
    return async function getPost(id){
      return await Post.findOne({_id: id});
    }
  }

  const makeGetPosts = function(Post, limit){
    return async function getPosts(lastPostTime){
      return await Post.find({timeStamp: {$gte: lastPostTime}},
        {
          skip: 0,
          limit: limit,
          sort: {
            timeStamp: -1
          }
        }
      );
    }
  }

  return Object.freeze({
    makeInsertPost,
    makeGetPost,
    makeGetPosts
  });
}