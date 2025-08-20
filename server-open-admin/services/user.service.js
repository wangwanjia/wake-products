const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

exports.register = async (username, password, forumUrl, email = null, phone = null) => {
  // 密码加密
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.User.create({
    username,
    password: hashedPassword,
    forumUrl,
    email,
    phone
  });
  if (!user) {
    throw new Error('用户创建失败');
  }
  return { message: '用户创建成功', success: true };
};

exports.login = async (username, password, userId) => {

  const user = await db.User.findOne({ where: { username, uuid: userId} });
  if (!user) throw new Error('用户不存在');
  // 对密码进行比较
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('isPasswordValid',isPasswordValid);
  if (!isPasswordValid) throw new Error('用户名或密码错误');
  
  // 生成JWT
  const token = jwt.sign(
    { 
      userId: user.uuid,
      username: user.username,
     },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  return {token};
};

// 管理员登录
exports.loginAdmin = async (username, password) => {
  
  if (username !== process.env.ADMIN_NAME) {
    throw new Error('用户名错误');
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error('密码错误');
  }
  // 生成JWT
  const token = jwt.sign(
    { 
      username,
      password
     },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return {token};
};

exports.getUsers = async (page = 1, pageSize = 10, username = '') => {
  const offset = (page - 1) * pageSize;
  const where = {};
  
  if (username) {
    where.username = { [db.Sequelize.Op.like]: `%${username}%` };
  }
  
  const { count, rows } = await db.User.findAndCountAll({
    where,
    limit: pageSize,
    offset,
    attributes: { exclude: ['password'] },
    order: [['createdAt', 'DESC']]
  });
  
  return {
    total: count,
    pages: Math.ceil(count / pageSize),
    currentPage: page,
    data: rows
  };
};

exports.updateUser = async (id, data) => {
  const user = await db.User.findOne({ where: { id } });

  if (!user) throw new Error('用户不存在');
  
  // 如果更新密码，则加密
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  let {dataValues} = await user.update(data);
  console.log('更新后:', dataValues);
  return {success: true, message: '用户更新成功'};
};

exports.batchDeleteUsers = async (ids) => {
  // 转换为数组
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请提供要删除的用户ID列表');
  }
  
  let result = await db.User.destroy({
    where: { id: ids }
  });
  
  return { success: true, message: `成功删除${result}个用户` };
};

exports.getUserById = async (id) => {
// 添加 attributes 选项是为了排除用户密码字段，避免在查询结果中返回敏感的密码信息，增强系统的安全性。
  const user = await db.User.findOne({where:{id}});
  if (!user) {
    throw new Error('用户不存在');
  }
  return user;
};