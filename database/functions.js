module.exports = function buildMakeFunctions() {
  function makeInsertPost(Post) {
    return async function insert(postInfo) {
      const post = new Post({ ...postInfo });
      return await post.save();
    };
  }

  function makeGetPost(Post) {
    return async function getPost(id) {
      return await Post.findOne({ _id: id });
    };
  }

  function makeGetPosts(Post, limit) {
    return async function getPosts(lastPostTime) {
      return await Post.find(
        { timeStamp: { $gte: lastPostTime } },
        {
          skip: 0,
          limit: limit,
          sort: {
            timeStamp: -1
          }
        }
      );
    };
  }

  function makeIncPostLikes(Post) {
    return async function incPostLikes(id, inc) {
      const post = await Post.findOneAndUpdate(
        { _id: id },
        { likes: { $inc: inc } },
        { new: true }
      );
      return post;
    };
  }

  function makeAddPostToLikedPosts(User) {
    return async function addPostToLikedPosts(postId, userId) {
      return await User.updateOne(
        { _id: userId },
        { new: true },
        { $push: { likedPosts: postId } }
      );
    };
  }

  function makeRemovePostFromLikedPosts(User) {
    return async function removePostFromLikedPosts(postId, userId) {
      return await User.updateOne(
        { _id: userId },
        { new: true },
        { $pull: { likedPosts: postId } }
      );
    };
  }

  function makeVerifyPostLiked(User) {
    return async function verifyPostLiked(postId, userId) {
      const user = await User.findOne({ _id: userId }, ["likedPosts"]);
      const likedPosts = user.likedPosts.filter(likedPost => {
        return likedPost.post.equals(postId);
      });
      return likedPosts.length ? true : false;
    };
  }

  function makeInsertUser(User) {
    return async function({
      phoneNumber,
      dateCreated,
      dislikes,
      likes,
      posts,
      token
    }) {
      const user = new User({
        phoneNumber: phoneNumber,
        dateCreated: dateCreated,
        dislikes: dislikes,
        likes: likes,
        posts: posts,
        token: token
      });
      return await user.save();
    };
  }

  function makeGetUser(User) {
    return async function getUser({ _id, phoneNumber }) {
      let user;
      if (_id) {
        user = await User.findOne({ _id: _id });
      }else if(phoneNumber){
        user = await User.findOne({ phoneNumber: phoneNumber });
      }
      return user;
    };
  }

  function makeUpdateUserToken(User) {
    return async function updateUserToken(token, { _id }) {
      await User.findOneAndUpdate({ _id: _id }, { $set: { token: token } });
    };
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
      makeInsertUser,
      makeGetUser,
      makeUpdateUserToken
    }
  });
};
