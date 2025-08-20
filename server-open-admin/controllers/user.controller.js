const userService = require('../services/user.service');


// 注册用户
exports.register = async (ctx) => {
  try {
    const { username, password, forumUrl, email, phone } = ctx.request.body;
    const result = await userService.register(username, password, forumUrl, email, phone);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
};

// 用户登录
exports.login = async (ctx) => {
  try {
    // 记录请求
    const { username, password, userId } = ctx.request.body;
    const result = await userService.login(username, password, userId);
    ctx.body = { token: result.token};
  } catch (error) {
    ctx.status = 401;
    ctx.body = { message: error.message };
  }
};

// 管理员登录
exports.loginAdmin = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const result = await userService.loginAdmin(username, password);
    ctx.body = result;
  } catch (error) {
    ctx.status = 401;
    ctx.body = { message: error.message };
  }
};

// 获取用户列表（带分页）
exports.getUsers = async (ctx) => {
  try {
    const { page = 1, pageSize = 10, username = '' } = ctx.query;
    const result = await userService.getUsers(Number(page), Number(pageSize), username);
    ctx.body = { ...result };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
};

// 更新用户
exports.updateUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const data = ctx.request.body;
    const result = await userService.updateUser(id, data);
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
};

// 批量删除用户
exports.batchDeleteUsers = async (ctx) => {
  try {
    const { ids } = ctx.request.body;
    const result = await userService.batchDeleteUsers(ids);
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
};

// 根据用户名查询用户
exports.getUserByUsername = async (ctx) => {
  try {
    
    const { username } = ctx.query;
    const user = await userService.getuserbyusername(username);
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: '用户不存在' };
    } else {
      ctx.body = user;
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
};

// 获取单个用户信息
exports.getUserById = async (ctx) => {
  try {
    const { id } =  ctx.params;
    const user = await userService.getUserById(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: '用户不存在' };
    } else {
      ctx.body = user;
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
};

// 初始化服务中的getUserById方法
exports.initUserService = () => {
  // 这里可以添加初始化逻辑
  return true;
};