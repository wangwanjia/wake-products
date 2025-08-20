const orderService = require('../services/order.service');

// 创建订单
exports.createOrder = async (ctx) => {
  try {
    const orderData = ctx.request.body;
    const result = await orderService.createOrder(orderData);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    ctx.status = 200;
    ctx.body = { success: false, error: error.message };
  }
};

// 获取所有订单（分页）
exports.getAllOrders = async (ctx) => {
  try {
    const { page = 1, pageSize = 10 } = ctx.query;
    const result = await orderService.getAllOrders(Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 批量删除订单
exports.deleteOrders = async (ctx) => {
  try {
    const { orderIds } = ctx.request.body;
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      ctx.status = 400;
      return ctx.body = { success: false, error: '请选择要删除的订单' };
    }
    const result = await orderService.deleteOrders(orderIds);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 根据用户名搜索订单
exports.searchOrdersByUserName = async (ctx) => {
  try {
    const { userName, page = 1, pageSize = 10 } = ctx.query;
    if (!userName) {
      ctx.status = 400;
      return ctx.body = { success: false, error: '用户名不能为空' };
    }
    const result = await orderService.searchOrdersByUserName(userName, Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 清空订单表
exports.clearOrders = async (ctx) => {
  try {
    const result = await orderService.clearOrders();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 获取订单统计信息
exports.getOrderStats = async (ctx) => {
  try {
    const result = await orderService.getOrderStats();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};