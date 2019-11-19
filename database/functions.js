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

const makeIncPostLikes = function(Post){
  return async function incPostLikes(id, inc){
    const post = await Post.findOneAndUpdate({_id: id}, {likes: {$inc: inc}}, {new: true})
    return post;
  }
}

const makeAddPostToLikedPosts = function(User){
  return async function addPostToLikedPosts(postId, userId){
    return await User.updateOne({_id: userId}, {new: true}, {$push: {likedPosts: postId}})
  }
}

const makeRemovePostFromLikedPosts = function(User){
  return async function removePostFromLikedPosts(postId, userId){
    return await User.updateOne({_id: userId}, {new: true}, {$pull: {likedPosts: postId}})
  }
}

const makeVerifyPostLiked = function(User){
  return async function verifyPostLiked(postId, userId){
    const user = await User.findOne({_id: userId}, ['likedPosts']);
    const likedPosts = user.likedPosts.filter(likedPost => {
      return likedPost.post.equals(postId);
    });
    return likedPosts.length ? true : false;
  }
}

const makeGetUser = function(User){
  return async function getUser({username, phoneNumber}){
    if(username){
      return await User.findOne({username: username});
    }
    return await User.findOne({phoneNumber: phoneNumber});
  }
}

  return Object.freeze({
    makeInsertPost,
    makeGetPost,
    makeGetPosts,
    makeIncPostLikes,
    makeAddPostToLikedPosts,
    makeVerifyPostLiked,
    makeRemovePostFromLikedPosts,
    user: {
      makeGetUser
    }
  });
}