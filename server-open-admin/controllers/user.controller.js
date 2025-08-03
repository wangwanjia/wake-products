const userService = require('../services/user.service');

exports.register = async (ctx) => {

  console.log(ctx.request.body);
  
  const { username, password, email } = ctx.request.body;
  const result = await userService.register(username, password, email);
  ctx.status = 201;
  ctx.body = { message: 'User created', userId: result.userId };
};

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const result = await userService.login(username, password);
  ctx.body = { token: result.token, userId: result.userId };
};