import Router from 'koa-router';
import { uploadFile } from '../controllers/uploadController.js';

const router = new Router({ prefix: '/upload' });

router.post('/', uploadFile);

export default router;
