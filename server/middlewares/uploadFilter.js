// 导入AppError和ErrorTypes
  const { AppError, ErrorTypes } = require('./errorHandler');

  // 允许上传文件的接口路径
  const ALLOWED_UPLOAD_PATHS = [
  '/api/upload/image',
  '/api/upload/multipleImage',
  '/api/upload/video',
  '/api/upload/file'
];

/**
 * 上传过滤中间件 - 只允许特定接口上传文件
 */
async function uploadFilter(ctx, next) {
  // 检查是否是multipart请求（文件上传）
  const isMultipart = ctx.is('multipart/form-data');

  // 如果是文件上传请求
  if (isMultipart) {
    // 检查请求路径是否在允许的列表中
    const requestPath = ctx.path;
    console.log(requestPath);
    console.log(ALLOWED_UPLOAD_PATHS.includes(requestPath));
    
    if (!ALLOWED_UPLOAD_PATHS.includes(requestPath)) {
      // 不是允许的上传接口，返回错误

      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        `不允许在此接口上传文件。`
      );
    }
  }

  // 继续处理请求
  await next();
}

module.exports = uploadFilter;