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
router.get('/getAll', OpenCodeController.getAll);

// 获取开奖数据 
// 新澳门
router.get('/getOpenDataNewMacaoYear', OpenCodeController.getOpenDataNewMacaoYear);
router.get('/getOpenDataMacaoYear', OpenCodeController.getOpenDataMacaoYear);
router.get('/getOpenDataHongKongYear', OpenCodeController.getOpenDataHongKongYear); 




module.exports = router;