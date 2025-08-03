async function logger(ctx, next) {
    const start = Date.now();
    await next(); // 等待下一个中间件执行
    const ms = Date.now() - start;
  
    const logText = `${ctx.method} ${ctx.url} - ${ctx.status} ${ms}ms`;
    console.log(logText);
  }

module.exports = logger;