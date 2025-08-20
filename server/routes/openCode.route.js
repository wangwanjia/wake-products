const Router = require('koa-router');
const router = new Router({ prefix: '/openCode' });
const OpenCodeController = require('../controllers/openCode.controller');

// 定义路由
router.post('/create', OpenCodeController.create);
router.get('/getByDate', OpenCodeController.getByDate);
router.put('/update/:id', OpenCodeController.update);
// 单个删除
router.delete('/del/:id', OpenCodeController.del);
// 批量删除
router.delete('/del', OpenCodeController.del);
// 清空所有数据
router.delete('/clearAll', OpenCodeController.clearAll);
router.get('/getAll', OpenCodeController.getAll);

// 获取开奖数据 近三年
router.get('/getOpenDataYear', OpenCodeController.getOpenDataYear);
// 获取开奖数据 最新一期
router.get('/getOpenDataNew', OpenCodeController.getOpenDataNew);


module.exports = router;