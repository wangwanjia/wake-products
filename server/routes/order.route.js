const Router = require('koa-router');
const orderController = require('../controllers/order.controller');

const router = new Router({
  prefix: '/order'
});

// 创建订单
router.post('/', orderController.createOrder);


// 获取所有订单（分页）
router.get('/', orderController.getAllOrders);

// 批量删除订单
router.delete('/', orderController.deleteOrders);

// 根据用户名搜索订单
router.get('/search', orderController.searchOrdersByUserName);

// 清空订单表
router.delete('/clear', orderController.clearOrders);

// 获取订单统计信息
router.get('/stats', orderController.getOrderStats);

module.exports = router;