const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Post = mongoose.model('Post', require('../../../models/post'));
const User = mongoose.model('User', require('../../../models/user'));

router.post('/', (req, res) => {
  const post = new Post({
    user: req.auth.id,
    text: req.body.postText,
    likes: 0,
    timeStamp: new Date,
    location: 'At Home'
  });
  post.save((err, post) => {
    if (err) throw err;
    res.status(200).json({post: post});
  });
});

router.delete('/', (req, res) => {
  Post.findOneAndDelete({
    _id: req.body.id
  }, (err, post) => {
    if (err) {
      res.status(500).json({message: 'An internal error occurred', errMessage: err.message});
      throw err;
    }
    res.json({post: post});
  });
});

router.put('/like', (req, res) => {
  User.findOne({_id: req.auth.id}, ['likedPosts', 'dislikedPosts'], (userErr, user) => {
    Post.findOne({_id: req.body.id}, ['_id', 'timeStamp'], (postErr, post) => {
      if(post){
        let likesArr = user.likedPosts.filter((likedPost) => {
          return likedPost.post.equals(post._id);
        });
        let dislikesArr = user.dislikedPosts.filter((dislikedPost) => {
          return dislikedPost.post.equals(post._id);
        });
        if(dislikesArr.length){
          user.updateOne({$pull: {dislikedPosts: {post: dislikesArr[0].post}}}, (userDislikeUpdateErr) => {
            if(userDislikeUpdateErr) throw userDislikeUpdateErr;
            user.updateOne({$push: {likedPosts: {post: req.body.id, timeStamp: post.timeStamp}}}, (userLikeUpdateErr) => {
              if(userLikeUpdateErr) throw userLikeUpdateErr;
              post.updateOne({$inc: {likes: 2}}, (incErr) => {
                if(incErr) throw incErr;
                res.json({
                  message: `Post ${post._id} liked`,
                  post: {
                    id: post._id,
                    timeStamp: post.timeStamp,
                    inc: 2
                  }
                });
              });
            });
          });
        }else{
          if(likesArr.length){
            user.updateOne({$pull: {likedPosts: {post: likesArr[0].post}}}, (userLikeUpdateErr) => {
              if(userLikeUpdateErr) throw userLikeUpdateErr;
              post.updateOne({$inc: {likes: -1}}, (incErr) => {
                if(incErr) throw incErr;
                res.json({
                  message: `Post ${post._id} unliked`,
                  post: {
                    id: post._id,
                    timeStamp: post.timeStamp,
                    inc: -1
                  }
                });
              });
            });
          }else{
            user.updateOne({$push: {likedPosts: {post: req.body.id, timeStamp: post.timeStamp}}}, (userLikeUpdateErr) => {
              if(userLikeUpdateErr) throw userLikeUpdateErr;
              post.updateOne({$inc: {likes: 1}}, (incErr) => {
                if(incErr) throw incErr;
                res.json({
                  message: `Post ${post._id} liked`,
                  post: {
                    id: post._id,
                    timeStamp: post.timeStamp,
                    inc: 1
                  }
                });
              });
            });
          }
        }
      }else{
        res.status(404).json({message: 'Post cannot be found'});
      }
    });
  });
});

router.put('/dislike', (req, res) => {
  User.findOne({_id: req.auth.id}, ['likedPosts', 'dislikedPosts'], (userErr, user) => {
    Post.findOne({_id: req.body.id}, ['_id', 'timeStamp'], (postErr, post) => {
      if(post){
        let likesArr = user.likedPosts.filter((likedPost) => {
          return likedPost.post.equals(post._id);
        });
        let dislikesArr = user.dislikedPosts.filter((dislikedPost) => {
          return dislikedPost.post.equals(post._id);
        });
        if(likesArr.length){
          user.updateOne({$pull: {likedPosts: {post: likesArr[0].post}}, $push: {dislikedPosts: {post: req.body.id, timeStamp: post.timeStamp}}}, (userUpdateErr) => {
            if (userUpdateErr) throw userUpdateErr;
            post.updateOne({$inc: {likes: -2}}, (incErr) => {
              if(incErr) throw incErr;
              res.json({
                message: `Post ${post._id} disliked`,
                post: {
                  id: post._id,
                  timeStamp: post.timeStamp,
                  inc: -2
                }
              });
            });
          });
        }else{
          if(dislikesArr.length){
            user.updateOne({$pull: {dislikedPosts: {post: dislikesArr[0].post}}}, (userDislikeUpdateErr) => {
              if(userDislikeUpdateErr) throw userDislikeUpdateErr;
              post.updateOne({$inc: {likes: 1}}, (incErr) => {
                if(incErr) throw incErr;
                res.json({
                  message: `Post ${post._id} undisliked`,
                  post: {
                    id: post._id,
                    timeStamp: post.timeStamp,
                    inc: 1
                  }
                });  
              });
            });
          }else{
            user.updateOne({$push: {dislikedPosts: {post: req.body.id, timeStamp: post.timeStamp}}}, (userDislikeUpdateErr) => {
              if(userDislikeUpdateErr) throw userDislikeUpdateErr;
              post.updateOne({$inc: {likes: -1}}, (incErr) => {
                if(incErr) throw incErr;
                res.json({
                  message: `Post ${post._id} disliked`,
                  post: {
                    id: post._id,
                    timeStamp: post.timeStamp,
                    inc: -1
                  }
                });
              });
            });
          }
        }
      }else{
        res.status(404).json({message: `Post ${post._id} was not found`});
      }
    });
  });
});

module.exports = router;