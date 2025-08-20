const Router = require('koa-router');
const router = new Router({ prefix: '/user' });
const userController = require('../controllers/user.controller');

// 注册路由
router.post('/register', userController.register);
// 登录路由
router.post('/login', userController.login);

// 登录管理员路由
router.post('/loginAdmin', userController.loginAdmin);

// 批量删除用户 - 仅管理员
router.delete('/batchDelete', userController.deleteUsers);

// 编辑用户
router.put('/:id', userController.updateUser);

// 用户名搜索 - 仅管理员
router.get('/search', userController.searchUsers);

// 获取所有用户（分页）- 仅管理员
router.get('/', userController.getAllUsers);

module.exports = router;