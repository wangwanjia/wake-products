const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models');
const axios = require('axios');

// 注册用户
async function register(username, password, ip) {
  try {
    // 检查用户是否已存在
    const existingUser = await db.User.findOne({
      where: {
        [Op.or]: [
          { account: username },
        ]
      }
    });

    if (existingUser) {
      throw new Error('用户名已存在');
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      account: username,
      password: hashedPassword,
      ip
    });

    return { message: '注册成功', success: true,username:user.account };
  } catch (error) {
    throw new Error(`Failed to register user: ${error.message}`);
  }
};

// 用户登录
async function login(username, password, ip) {
  try {
    const user = await db.User.findOne({ where: { account: username } });
    if (!user) {
      throw new Error('用户名不存在');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('密码错误');
    }

    // 对比IP是否一致，不一致则更新
    if (user.ip !== ip) {
      await user.update({ ip });
    }

    // 生成JWT
    const token = jwt.sign(
      { userId: user.id, username: user.account, gold: user.gold, purchasedPostIds: user.purchasedPostIds },
      process.env.JWT_SECRET || 'caicai',
      { expiresIn: '1d' }
    );

    return { token, message: '登录成功', success: true, username: user.account, gold: user.gold, purchasedPostIds: user.purchasedPostIds };
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
};

// 管理员登录
async function loginAdmin(username, password, userId,requestUrl,requestIp) {
  try {

    const admin = await axios.get('http://localhost:3000/admin/login', {
      params: {
        username,
        password,
        userId,
        requestUrl,
        requestIp
      }
    })

    if (!admin.token) {
      throw new Error('登录失败');
    }

    // 生成JWT  
    const token = jwt.sign(
      { token: admin.token },
      process.env.JWT_SECRET || 'caicai',
      { expiresIn: '1d' }
    );
    return { token, message: '登录成功', success: true };
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
};


// 批量删除用户
async function deleteUsers(userIds) {
  try {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error('请选择要删除的用户');
    }

    const result = await db.User.destroy({
      where: {
        id: {
          [Op.in]: userIds
        }
      }
    });

    return { message: `成功删除 ${result} 个用户`, success: true };
  } catch (error) {
    throw new Error(`Failed to delete users: ${error.message}`);
  }
}

// 编辑用户
async function updateUser(userId, userData) {
  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // 如果更新密码，则加密
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }


    await user.update(userData);
    return { message: '用户信息更新成功', success: true };
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

// 用户名搜索
async function searchUsers(username, page = 1, pageSize = 10) {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await db.User.findAndCountAll({
      where: {
        account: {
          [Op.like]: `%${username}%`
        }
      },
      limit: pageSize,
      offset: offset,
      attributes: { exclude: ['password'] }
    });

    return {
      total: count,
      success: true,
      data: rows
    };
  } catch (error) {
    throw new Error(`Failed to search users: ${error.message}`);
  }
}

// 获取所有用户（分页）
async function getAllUsers(page = 1, pageSize = 10) {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await db.User.findAndCountAll({
      limit: pageSize,
      offset: offset,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    return {
      total: count,
      success: true,
      data: rows
    };
  } catch (error) {
    throw new Error(`Failed to get all users: ${error.message}`);
  }
}

module.exports = {
  register,
  login,
  loginAdmin,
  deleteUsers,
  updateUser,
  searchUsers,
  getAllUsers
};