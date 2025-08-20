const Router = require('koa-router');
const router = new Router({ prefix: '/caicai' });
const caicaiController = require('../controllers/caicai.controller');

// 获取默认配置
router.get('/', caicaiController.getDefaultCaicai);

// 修改配置
router.put('/:id', caicaiController.updateCaicai);

module.exports = router;