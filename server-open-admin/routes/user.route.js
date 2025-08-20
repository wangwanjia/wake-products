const Router = require('koa-router');
const router = new Router({ prefix: '/user' });
const userController = require('../controllers/user.controller');


// 注册路由
router.post('/register', userController.register);

// 登录路由
router.post('/login', userController.login);
router.post('/loginAdmin', userController.loginAdmin);

// 获取用户列表（带分页）
router.get('/', userController.getUsers);

// 获取单个用户信息
router.get('/detail/:id', userController.getUserById);

// 更新用户
router.put('/update/:id', userController.updateUser);

// 批量删除用户
router.delete('/batchDelete', userController.batchDeleteUsers);

module.exports = router;