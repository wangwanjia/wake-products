const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const userController = require('../controllers/user.controller');


// 注册路由
router.post('/register', userController.register);
// 登录路由
router.post('/login', userController.login);

module.exports = router;