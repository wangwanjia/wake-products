const Router = require('koa-router');
const accessController = require('../controllers/access.controller');
const router = new Router({
  prefix: '/access'
});

// 添加网站访问记录
router.post('/add', accessController.createWebAccess);

// 分页查询网站访问记录
router.get('/', accessController.getWebAccessList);

// 删除网站访问记录
router.delete('/', accessController.deleteWebAccess);

module.exports = router;