import Post from '../models/postsModel.js';

export async function getPosts(ctx) {
  // const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
  // ctx.body = posts;
  ctx.body = {
    code: 200,
    data: {
      name: 'zhangsan',
      age: 18
    }
  };
}

export async function getPostById(ctx) {
  const post = await Post.findByPk(ctx.params.id);
  if (!post) {
    ctx.status = 404;
    ctx.body = { message: 'Post not found' };
    return;
  }
  ctx.body = post;
}

export async function createPost(ctx) {
  const { title, content } = ctx.request.body;
  const post = await Post.create({ title, content });
  ctx.status = 201;
  ctx.body = post;
}
