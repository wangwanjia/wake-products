const OpenCodeService = require('../services/openCode.service');


// 创建开奖记录
async function create(ctx) {
  try {
    console.log(ctx.request.body);
    
    const result = await OpenCodeService.createOpenCode(ctx.request.body);
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
    const { startDate, endDate } = ctx.query;
    if (!startDate || !endDate) {
      ctx.status = 400;
      return ctx.body = { error: '请提供开始日期和结束日期' };
    }
    const result = await OpenCodeService.getOpenCodesByDate(startDate, endDate);
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
    const result = await OpenCodeService.updateOpenCode(id, ctx.request.body);
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
    const { page = 1, pageSize = 10 } = ctx.query;
    const result = await OpenCodeService.getAllOpenCodes(Number(page), Number(pageSize));
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
    const { id } = ctx.params;
    let ids;
    
    if (id) {
      // 单个删除
      ids = id;
    } else {
      // 批量删除
      ids = ctx.request.body.ids;
      console.log(ctx.request.body);
      
      if (!ids || !Array.isArray(ids)) {
        ctx.status = 400;
        return ctx.body = { error: '批量删除时必须提供ids数组' };
      }
    }
    
    const result = await OpenCodeService.deleteOpenCode(ids);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 获取开奖数据 
// 新澳门
async function getOpenDataNewMacaoYear(ctx) {
  try {
    const result = await OpenCodeService.getOpenDataNewMacaoYear();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 获取开奖数据 
// 澳门
async function getOpenDataMacaoYear(ctx) {
  try {
    const result = await OpenCodeService.getOpenDataMacaoYear();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

// 获取开奖数据 
// 香港
async function getOpenDataHongKongYear(ctx) {
  try {
    const result = await OpenCodeService.getOpenDataHongKongYear();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}



module.exports = {
  create,
  getByDate,
  update,
  del,
  getAll,
  // 开奖数据 年
  getOpenDataNewMacaoYear,
  getOpenDataMacaoYear,
  getOpenDataHongKongYear,
};