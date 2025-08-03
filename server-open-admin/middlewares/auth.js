const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader) ctx.throw(401, 'Authorization header missing');
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = { userId: decoded.userId };
    await next();
  } catch (err) {
    ctx.throw(401, 'Invalid token');
  }
};