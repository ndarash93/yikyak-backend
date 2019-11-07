import makeAddPost from './add-post';
import postDB from '../mongo';

const addPost = makeAddPost({ postDB })

const postService = Object.freeze({
  addPost
})

export default postService