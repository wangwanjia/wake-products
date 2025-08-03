const db = require('../models');

exports.getPosts = async () => {
  return await db.Post.findAll({ order: [['createdAt', 'DESC']] });
};

exports.getPostById = async (id) => {
  const post = await db.Post.findByPk(id);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

exports.createPost = async (title, content) => {
  return await db.Post.create({ title, content });
};