const jwt = require('jsonwebtoken');
const {createWebAccess} = require('../controllers/access.controller');

// 公开路由
const userRoutesArr = [
  '/api/access/add',
  '/api/openCode/getOpenDataYear',
  '/api/openCode/getOpenDataNew',
];
// 管理员路由
const publicRoutesArr = [
  '/api/openCode/getAll',
  '/api/user/loginAdmin',
  '/api/user/login'
];
/**
 * 认证中间件
 * 用于验证请求中的JWT token
 * @returns {Function} Koa中间件函数
 */
module.exports = async function authMiddleware(ctx, next) {
  try {
    // 如何是登录页面 不验证token
    // 检查是否是公开路由（不需要认证）
    if(publicRoutesArr.includes(ctx.path)) {
      await next();
      return;
    }
    // 从请求头获取token
    let token = ctx.headers.authorization;
    // 检查token是否存在
    if (!token) {
      ctx.throw(401, 'Authorization token missing');
    } else {
      // 其他认证错误
      // 处理Bearer Token格式
      if (token.startsWith('Bearer ')) {
        token = token.slice(7);
      }
    }
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.username == process.env.ADMIN_NAME && decoded.password == process.env.ADMIN_PASSWORD) {
      await next();
    }else{
       // 将解码后的用户信息存储在ctx.state中
      ctx.state.user = { userId: decoded.userId, ...decoded };
      ctx.request.body = { ...ctx.request.body, ...decoded };
      try {
        // 添加访问记录 必须添加 userId username requestUrl requestIp
        await createWebAccess(ctx);
      } catch (error) {
        ctx.logger.error('Failed to create web access record:', error);
      }
      // 继续处理请求
      if(userRoutesArr.includes(ctx.path)) {
        await next();
      } else {
        // 对于非用户路由，返回403禁止访问
        ctx.body = {
          code: 403,
          msg: 'Access denied: Insufficient permissions'
        };
      }
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      ctx.body = {
        code: 401,
        msg: 'Invalid token',
      };
    } else if (err.name === 'TokenExpiredError') {
      // Token过期错误
      ctx.body = {
        code: 401,
        msg: 'Token expired',
      };
    } else {
      ctx.body = {
        code: 401,
        msg: 'Authentication failed',
      };
    }
  }
}