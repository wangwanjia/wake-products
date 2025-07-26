const uploadService = require('../services/upload.service');


// 上传单个文件
async function uploadFile(ctx) {
  const result = await uploadService.uploadFile(ctx.request.files?.file, ctx);
  ctx.body = result;
}


// 上传图片文件
async function uploadImage(ctx) {
  const result = await uploadService.uploadImage(ctx.request.files?.file, ctx);
  ctx.body = result;
}

// 上传多个图片
async function uploadMultipleImages(ctx) {
  // 确保files是数组
  const files = Array.isArray(ctx.request.files?.file) ? ctx.request.files.file : [ctx.request.files?.file].filter(Boolean);
  const result = await uploadService.uploadMultipleImages(files, ctx);
  ctx.body = result;
}

// 上传视频文件
async function uploadVideo(ctx) {
  const result = await uploadService.uploadVideo(ctx.request.files?.file, ctx);
  ctx.body = result;
}

// 上传普通文件
async function uploadGeneralFile(ctx) {
  const result = await uploadService.uploadGeneralFile(ctx.request.files?.file, ctx);
  ctx.body = result;
}

module.exports = {
  uploadFile,
  uploadMultipleImages,
  uploadVideo,
  uploadGeneralFile,
  uploadImage
};
