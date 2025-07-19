const postService = require('../services/post.service');

async function getPosts(ctx) {
  const posts = await postService.getPosts();
  ctx.body = {
    code: 200,
    data: posts
  };
}

async function getPostById(ctx) {
  try {
    const post = await postService.getPostById(ctx.params.id);
    ctx.body = post;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { message: error.message };
  }
}

async function createPost(ctx) {
  const { title, content } = ctx.request.body;
  const post = await postService.createPost(title, content);
  ctx.status = 201;
  ctx.body = post;
}

module.exports = {
  getPosts,
  getPostById,
  createPost
};
