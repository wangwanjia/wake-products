const { v4: uuidv4 } = require('uuid');

// 定义常见错误类型
const ErrorTypes = {
  BAD_REQUEST: { status: 400, message: '请求参数错误' },
  UNAUTHORIZED: { status: 401, message: '未授权访问' },
  FORBIDDEN: { status: 403, message: '权限不足' },
  NOT_FOUND: { status: 404, message: '请求资源不存在' },
  METHOD_NOT_ALLOWED: { status: 405, message: '请求方法不支持' },
  INTERNAL_SERVER_ERROR: { status: 500, message: '服务器内部错误' },
};

// 自定义错误类
class AppError extends Error {
  constructor(type, message = null, details = null) {
    super(message || type.message);
    this.status = type.status;
    this.details = details;
    this.name = 'AppError';
  }
}

async function errorHandler(ctx, next) {
  // 生成请求ID
  const requestId = uuidv4();
  ctx.requestId = requestId;

  try {
    await next();

    // 处理404错误
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = {
        error: '请求资源不存在',
        requestId,
        path: ctx.path,
        method: ctx.method
      };
    }
  } catch (err) {
    // 设置默认错误状态和消息
    let status = 500;
    let errorMessage = '服务器内部错误';
    let details = null;


  
    // 处理自定义错误
    if (err.name === 'AppError') {
      status = err.status;
      errorMessage = err.message;
      details = err.details;
    } 
    // 处理请求参数错误
    else if (err.name === 'ValidationError') {
      status = 400;
      errorMessage = '请求参数错误';
      details = err.details;
    } 
    // 处理方法不支持错误
    else if (err.code === 'EPARAMS') {
      status = 400;
      errorMessage = err.message;
    } 
    // 处理数据库错误
    else if (err.name === 'SequelizeError') {
      status = 500;
      errorMessage = '数据库操作错误';
      // 在开发环境下提供详细错误信息
      if (process.env.NODE_ENV === 'development') {
        details = err.original ? err.original.message : err.message;
      }
    }

    // 设置响应状态和内容
    ctx.status = status;
    ctx.body = {
      error: errorMessage,
      requestId,
      path: ctx.path,
      method: ctx.method
    };

    // 在开发环境下添加详细错误信息和堆栈
    if (process.env.NODE_ENV === 'development') {
      ctx.body.details = details || err.message;
      ctx.body.stack = err.stack;
    }

    // 记录错误日志
    console.error(`[${new Date().toISOString()}] [${requestId}] Error:`, err);
  }
}
  
module.exports = {
  errorHandler,
  AppError,
  ErrorTypes
};
  