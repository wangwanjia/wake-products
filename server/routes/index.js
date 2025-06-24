import fs from 'fs/promises';
import path from 'path';
import Router from 'koa-router';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function useRoutes(app) {
  const files = await fs.readdir(__dirname);
  const router = new Router({ prefix: '/api' });

  for (const file of files) {
    if (file === 'index.js') continue;

    const module = await import(`./${file}`);
    const route = module.default;

    if (typeof route?.routes === 'function') {
      router.use(route.routes()).use(route.allowedMethods());
    }
  }

  app.use(router.routes()).use(router.allowedMethods());
}
