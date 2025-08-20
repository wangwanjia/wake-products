const Router = require('koa-router');
const viewsController = require('../controllers/views.controller');

const router = new Router({ prefix: '/views' });

// 新增访问记录
router.post('/', viewsController.createView);

// 获取所有访问记录（分页）
router.get('/', viewsController.getAllViews);

// 批量删除访问记录
router.delete('/', viewsController.deleteViews);

// 根据用户名搜索访问记录
router.get('/search', viewsController.searchViewsByUserName);

// 清空访问记录表
router.delete('/clear', viewsController.clearViews);

// 获取访问地区统计数据（用于图表展示）
router.get('/stats/location', viewsController.getViewLocationStats);

// 获取一个月内访问数据统计（用于图表展示）
router.get('/stats/monthly', viewsController.getMonthlyViewStats);

// 获取24小时内访问数据统计（用于图表展示）
router.get('/stats/24hours', viewsController.get24HoursViewStats);

// 获取设备类型统计数据（PC、移动、平板）
router.get('/stats/device', viewsController.getDeviceTypeStats);

module.exports = router;