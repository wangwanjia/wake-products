const Koa = require('koa');
const { koaBody } = require('koa-body');
const path = require('path');
const KoaStatic = require('koa-static');

const cors = require('@koa/cors');
const database = require('./config/database.js');

const useRoutes = require('./routes/index.js');
const {errorHandler} = require('./middlewares/errorHandler.js');
const logger = require('./middlewares/logger.js');

require('dotenv').config();

const app = new Koa();


// 定义异步启动函数
async function startServer() {
  try {
    const db = require('./models/index.js');
    console.log('加载的模型:', Object.keys(db));
    // 初始化数据库连接
    // 使用更安全的同步方式，避免因外键约束导致的删除表失败
    // 在开发环境可以使用{ force: true }强制删除并重建所有表
    // 但在生产环境应该使用迁移文件
    await database.sync({
      force: true, // 不删除现有表
      // alter: true, // 不修改现有表结构
      logging: console.log // 打印同步日志，方便调试
    }); 
    console.log('数据库同步成功');

    // 初始化Insert表数据
    try {
      await db.Insert.initData();
      console.log('Insert表数据初始化成功');
    } catch (error) {
      console.error('Insert表数据初始化失败:', error);
    }
  } catch (err) {
    console.error('数据库同步失败:', err);
    process.exit(1);
  } 

  // 中间件 
  // 错误处理 - 应该放在最前面
  app.use(errorHandler);
  // 允许跨域
  app.use(cors());

  // 上传过滤中间件 - 只允许特定接口上传文件
  const uploadFilter = require('./middlewares/uploadFilter');
  app.use(uploadFilter);

  // 解析请求体
  app.use(
    koaBody({
      multipart: true,
      formidable: {
        keepExtensions: true,
        maxFileSize: 100 * 1024 * 1024, // 100MB 限制
        onFileBegin: (name, file) => {
          // 重命名文件，保留原始扩展名
          const ext = path.extname(file.originalFilename);
          const filename  = `${Date.now()}${ext}`;
          file.newFilename = filename ;
          // 直接保存到最终目录，不使用临时目录
          file.filepath = path.resolve('uploads', filename );
        }
      }
    })
  );
  

  // 静态文件服务
  app.use(KoaStatic(path.join(process.cwd(), 'uploads')));

  app.use(logger); // ✅ 注册日志中间件
  // 路由注册
  useRoutes(app);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
