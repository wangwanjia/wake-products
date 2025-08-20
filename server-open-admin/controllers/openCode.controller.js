const OpenCodeService = require('../services/openCode.service');

// 创建开奖记录
async function create(ctx) {
  try {
    const { openType, ...data } = ctx.request.body;
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    const result = await OpenCodeService.createOpenCode(openType, data);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 按日期查询开奖记录
async function getByDate(ctx) {
  try {
    let { openType, startDate, endDate, page = 1, pageSize = 10,isChart = false } = ctx.query;
    if(isChart){
      page = 1;
      pageSize = 888;
    }
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    if (!startDate || !endDate) {
      ctx.status = 400;
      return ctx.body = { error: '请提供开始日期和结束日期' };
    }
    const result = await OpenCodeService.getOpenCodesByDate(openType, startDate, endDate, Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 更新开奖记录
async function update(ctx) {
  try {
    const { id } = ctx.params;
    const { openType, ...data } = ctx.request.body;
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    const result = await OpenCodeService.updateOpenCode(openType, id, data);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 获取全部开奖记录（分页）
async function getAll(ctx) {
  try {
    const { openType, page = 1, pageSize = 10 } = ctx.query;
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    const result = await OpenCodeService.getAllOpenCodes(openType, Number(page), Number(pageSize));
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 删除开奖记录（支持单个和批量删除）
async function del(ctx) {
  try {
    // 从params获取单个id或从body获取ids数组
    const { openType, ids } = ctx.request.body;
    let deleteIds;
    
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    
    // 批量删除
      deleteIds = ids;
      if (!deleteIds || !Array.isArray(deleteIds)) {
        ctx.status = 400;
        return ctx.body = { error: '批量删除时必须提供ids数组' };
      }
    
    const result = await OpenCodeService.deleteOpenCode(openType, deleteIds);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 清空所有开奖记录
async function clearAll(ctx) {
  try {
    const { openType } = ctx.request.body;
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    const result = await OpenCodeService.clearAllOpenCodes(openType);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}


// 获取开奖数据（按年份）
async function getOpenDataYear(ctx) {
  try {
    const { openType, year = new Date().getFullYear() } = ctx.query;
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    const result = await OpenCodeService.getOpenDataYear(openType, year);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 获取开奖数据（最新一期）
async function getOpenDataNew(ctx) {
  try {
    const { openType } = ctx.query;
    if (!openType) {
      ctx.status = 400;
      return ctx.body = { error: '请提供openType参数' };
    }
    const result = await OpenCodeService.getOpenDataNew(openType);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

module.exports = {
  // 新增
  create,
  // 按日期查询开奖记录
  getByDate,
  // 修改
  update,
  // 单个删除 批量删除
  del,
  // 获取所有数据
  getAll,
  // 清空所有开奖数据
  clearAll,
  // 开奖数据 年
  getOpenDataYear,  
  // 开奖数据 最新一期
  getOpenDataNew,
};