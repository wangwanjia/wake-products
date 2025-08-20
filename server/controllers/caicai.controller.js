const caicaiService = require('../services/caicai.service');

/**
 * 获取默认配置
 */
const getDefaultCaicai = async (ctx) => {
  try {
    const result = await caicaiService.getDefaultCaicai();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: '获取默认配置失败',
      error: error.message,
    };
  }
};

/**
 * 修改配置
 */
const updateCaicai = async (ctx) => {
  try {
    const { id } = ctx.params;
    const data = ctx.request.body;
    const result = await caicaiService.updateCaicai(id, data);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: '修改配置失败',
      error: error.message,
    };
  }
};

module.exports = {
  getDefaultCaicai,
  updateCaicai
};