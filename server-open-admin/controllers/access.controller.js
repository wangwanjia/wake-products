const accessService = require('../services/access.service');

/**
 * 添加网站访问记录
 * @param {Object} ctx - Koa上下文对象
 * @param {string} ctx.request.body.uuid - 用户ID
 * @param {string} ctx.request.body.username - 用户名
 * @param {string} ctx.request.body.requestUrl - 请求URL
 * @param {string} ctx.request.body.requestIp - 请求IP
 */
const createWebAccess = async (ctx) => {
  try {
    // 从ctx中得到 请求路径 请求ip 请求接口名称
    const accessData = ctx.request.body;
    accessData.api = ctx.request.url;
    accessData.uuid = accessData.userId;

    // 校验数据
    if (!accessData.userId || !accessData.username || !accessData.requestUrl || !accessData.requestIp) {
      ctx.body = {msg: '参数错误'};
      ctx.status = 400;
      return;
    }
    const result = await accessService.createWebAccess(accessData);
    ctx.body = result;
    ctx.status = 201;
  } catch (error) {
    ctx.body = {msg: '请求失败'};
    ctx.status = 500;
  }
};

/**
 * 分页查询网站访问记录
 * @param {Object} ctx - Koa上下文对象
 */
const getWebAccessList = async (ctx) => {
  try {
    // 从查询参数中获取分页信息
    let query = ctx.query;
    // 检查查询参数是否存在
    if (!query) {
      ctx.body = {msg: '缺少查询参数'};
      ctx.status = 400;
      return;
    }
    let result = await accessService.getWebAccessList(query);
    ctx.body = result;
    ctx.status = 200;
  } catch (error) {
    // 打印错误日志，方便排查问题
    ctx.body = {msg: '请求失败', error: error.message};
    ctx.status = 500;
  }
};
/**
 * 删除网站访问记录
 * @param {Object} ctx - Koa上下文对象
 */
const deleteWebAccess = async (ctx) => {
  try {
    const result = await accessService.deleteWebAccess();
    ctx.body = result;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {msg: '请求失败'};
    ctx.status = 500;
  }
};


module.exports = {
  createWebAccess,
  getWebAccessList,
  deleteWebAccess
};