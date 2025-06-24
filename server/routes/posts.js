// routes/posts.js
import Router from 'koa-router';
const router = new Router({ prefix: '/posts' });

import {
    getPosts,
    getPostById,
    createPost
  } from '../controllers/postsController.js';
  

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);

export default router;

