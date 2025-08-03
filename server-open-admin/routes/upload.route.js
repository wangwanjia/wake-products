const Router = require('koa-router');
const { uploadFile, uploadMultipleImages, uploadVideo, uploadGeneralFile, uploadImage } = require('../controllers/upload.controller.js');

const router = new Router({ prefix: '/upload' });

// 上传单个文件（默认，保持兼容性）
// router.post('/', uploadFile);

// 上传图片文件（专门的图片上传接口）   
router.post('/image', uploadImage);

// 上传多个文件
router.post('/multipleImage', uploadMultipleImages);

// 上传视频文件
router.post('/video', uploadVideo);

// 上传普通文件
router.post('/file', uploadGeneralFile);

module.exports = router;
