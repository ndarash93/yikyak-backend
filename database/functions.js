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
        { $inc: { likes: inc } },
        { new: true }
      );
      return post;
    };
  }

  function makeIncPostDislikes(Post) {
    return async function incPostDislikes(id, inc) {
      const post = await Post.findOneAndUpdate(
        { _id: id },
        { $inc: { dislikes: inc } },
        { new: true }
      );
      return post;
    };
  }

  function makeAddPostToLikes(User) {
    return async function addPostToLikes(postId, userId) {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $push: { likedPosts: postId } },
        {new: true}
      );
    };
  }

  function makeAddPostToDislikes(User) {
    return async function addPostToDislikes(postId, userId) {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $push: { dislikedPosts: postId } },
        {new: true}
      );
    };
  }

  function makeRemovePostFromLikes(User) {
    return async function removePostFromLikes(postId, userId) {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { likedPosts: postId } },
        {new: true}
      );
    };
  }

  function makeRemovePostFromDislikes(User) {
    return async function removePostFromDislikes(postId, userId) {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { dislikedPosts: postId } },
        {new: true}
      );
    };
  }

  function makeVerifyPostLiked(User) {
    return async function verifyPostLiked(postId, userId) {
      const user = await User.findOne({ _id: userId }, ["likedPosts"]);
      const likedPosts = user.likedPosts.filter(likedPost => {
        return likedPost.equals(postId);
      });
      return likedPosts.length ? true : false;
    };
  }

  function makeVerifyPostDisliked(User) {
    return async function verifyPostDisliked(postId, userId) {
      const user = await User.findOne({ _id: userId }, ["dislikedPosts"]);
      const dislikedPosts = user.dislikedPosts.filter(dislikedPost => {
        return dislikedPost.equals(postId);
      });
      return dislikedPosts.length ? true : false;
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
      } else if (phoneNumber) {
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
    makeIncPostDislikes,
    makeAddPostToLikes,
    makeAddPostToDislikes,
    makeVerifyPostLiked,
    makeVerifyPostDisliked,
    makeRemovePostFromLikes,
    makeRemovePostFromDislikes,
    user: {
      makeInsertUser,
      makeGetUser,
      makeUpdateUserToken
    }
  });
};
