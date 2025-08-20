const viewsService = require('../services/views.service');

// 新增访问记录
exports.createView = async (ctx) => {
  try {
    const viewData = ctx.request.body;
    const result = await viewsService.createView(viewData);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 获取所有访问记录（分页）
exports.getAllViews = async (ctx) => {
  try {
    const { page = 1, pageSize = 10 } = ctx.query;
    const result = await viewsService.getAllViews(Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 批量删除访问记录
exports.deleteViews = async (ctx) => {
  try {
    const { viewIds } = ctx.request.body;
    if (!viewIds || !Array.isArray(viewIds) || viewIds.length === 0) {
      ctx.status = 400;
      return ctx.body = { success: false, error: '请选择要删除的访问记录' };
    }
    const result = await viewsService.deleteViews(viewIds);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 根据用户名搜索访问记录
exports.searchViewsByUserName = async (ctx) => {
  try {
    const { userName, page = 1, pageSize = 10 } = ctx.query;
    if (!userName) {
      ctx.status = 400;
      return ctx.body = { success: false, error: '用户名不能为空' };
    }
    const result = await viewsService.searchViewsByUserName(userName, Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 清空访问记录表
exports.clearViews = async (ctx) => {
  try {
    const result = await viewsService.clearViews();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 获取访问地区统计数据（用于图表展示）
exports.getViewLocationStats = async (ctx) => {
  try {
    const result = await viewsService.getViewLocationStats();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 获取一个月内访问数据统计（用于图表展示）
exports.getMonthlyViewStats = async (ctx) => {
  try {
    const result = await viewsService.getMonthlyViewStats();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 获取24小时内访问数据统计（用于图表展示）
exports.get24HoursViewStats = async (ctx) => {
  try {
    const result = await viewsService.get24HoursViewStats();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};

// 获取设备类型统计数据（PC、移动、平板）
exports.getDeviceTypeStats = async (ctx) => {
  try {
    const result = await viewsService.getDeviceTypeStats();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { success: false, error: error.message };
  }
};