const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

exports.register = async (username, password, email) => {
  // 密码加密
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await db.User.create({
    username,
    password: hashedPassword,
    email
  });
  
  return { userId: user.id };
};

exports.login = async (username, password) => {
  const user = await db.User.findOne({ where: { username } });
  if (!user) throw new Error('Invalid credentials');
  
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');
  
  // 生成JWT
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  return { token, userId: user.id };
};