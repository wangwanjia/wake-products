import Koa from 'koa';
import {koaBody} from 'koa-body';
import path from 'path';
import KoaStatic from 'koa-static';
// import uploadRoutes from './routes/upload.js';

import cors from '@koa/cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';

import useRoutes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';

dotenv.config();

const app = new Koa();

// 中间件
app.use(cors());

// 解析请求体
app.use(
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.resolve('uploads'), // ✅ 保证是绝对路径
            keepExtensions: true,
            maxFileSize: 10 * 1024 * 1024, // 50MB 限制
            onFileBegin: (name, file) => {
                // 重命名文件，保留原始扩展名
                const ext = path.extname(file.originalFilename);
                const filename  = `${Date.now()}${ext}`;
                file.newFilename = filename ;
                file.filepath = path.resolve('uploads', filename ); // ✅ 设置保存路径
            }
        }
    })
);
// 静态文件服务
app.use(KoaStatic(path.join(process.cwd(), 'uploads')));

// 错误处理
app.use(errorHandler);
app.use(logger); // ✅ 注册日志中间件
// 路由注册
useRoutes(app);

// 启动服务
const PORT = process.env.PORT || 4000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL 连接成功');
        await sequelize.sync(); // 自动建表

        app.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ 数据库连接失败:', err);
    }
})();
