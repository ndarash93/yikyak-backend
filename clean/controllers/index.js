import {addPost} from '../use-cases';

import makePostPost from './post-post';

const postPost = makePostPost({addPost});

const postController = Object.freeze({postPost});

export default postController;