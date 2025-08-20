const userService = require('../services/user.service');

// 注册用户
exports.register = async (ctx) => {
  try {
    console.log(ctx.request.body);
    const { username, password, ip } = ctx.request.body;
    
    if (!username || !password) {
      ctx.status = 400;
      return ctx.body = { error: 'Username, password are required' };
    }
    
    const result = await userService.register(username, password, ip);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    ctx.status = 200;
    ctx.body = { error: error.message };
  }
};

// 用户登录
exports.login = async (ctx) => {
  try {
    const { username, password, ip } = ctx.request.body;

    if (!username || !password) {
      ctx.status = 400;
      return ctx.body = { error: 'Username and password are required' };
    }
    
    const result = await userService.login(username, password, ip);

    ctx.body = result;
    ctx.status = 200;

  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: error.message };
  }
};


// 管理员登录
exports.loginAdmin = async (ctx) => {
  try {
    const { username, password, userId } = ctx.request.body;

    if (!username || !password || !userId) {
      ctx.status = 400;
      return ctx.body = { error: 'Username, password and userId are required' };
    }
    
    const result = await userService.loginAdmin(username, password, userId);
    ctx.body = result;
    ctx.status = 200;
    
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: error.message };
  }
};

// 批量删除用户 - 仅管理员
exports.deleteUsers = async (ctx) => {
  try {
    const { userIds } = ctx.request.body;
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      ctx.status = 400;
      return ctx.body = { error: '请选择要删除的用户' };
    }
    
    const result = await userService.deleteUsers(userIds);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

// 编辑用户
exports.updateUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const userData = ctx.request.body;
    
    const result = await userService.updateUser(id, userData);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

// 用户名搜索
exports.searchUsers = async (ctx) => {
  try {
    const { username, page = 1, pageSize = 10 } = ctx.query;
    
    if (!username) {
      ctx.status = 400;
      return ctx.body = { error: 'Username is required for search' };
    }
    
    const result = await userService.searchUsers(username, Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

// 获取所有用户（分页）- 仅管理员
exports.getAllUsers = async (ctx) => {
  try {
    const { page = 1, pageSize = 10 } = ctx.query;
    const result = await userService.getAllUsers(Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}