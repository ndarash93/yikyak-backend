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

  return Object.freeze({
    makeInsertPost,
    makeGetPost
  })
}