// routes/posts.js
const Router = require('koa-router');
const router = new Router({ prefix: '/posts' });

const {
    getPosts,
    getPostById,
    createPost
  } = require('../controllers/posts.controller.js');
  

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);

module.exports = router;

