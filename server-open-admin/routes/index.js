const fs = require('fs/promises');
const path = require('path');
const Router = require('koa-router');

function useRoutes(app) {
  return new Promise(async (resolve, reject) => {
    try {
      const files = await fs.readdir(__dirname);
      const router = new Router({ prefix: '/api' });

      for (const file of files) {
        if (file === 'index.js') continue;

        const modulePath = path.join(__dirname, file);
        const route = require(modulePath);

        if (typeof route?.routes === 'function') {
          router.use(route.routes()).use(route.allowedMethods());
        }
      }

      app.use(router.routes()).use(router.allowedMethods());
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = useRoutes;
