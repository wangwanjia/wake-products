const { WebAccess } = require('../models');
const { Op } = require('sequelize');

/**
 * 添加网站访问记录
 * @param {Object} accessData - 访问记录数据
 * @returns {Promise<Object>} 创建的访问记录
 */
const createWebAccess = async (accessData) => {
  try {
    const webAccess = await WebAccess.create(accessData);
    return webAccess;
  } catch (error) {
    throw error;
  }
};

/**
 * 分页查询网站访问记录
 * @param {Object} query - 查询参数
 * @param {number} query.page - 页码
 * @param {number} query.pageSize - 每页数量
 * @param {string} query.userName - 用户名（可选）
 * @returns {Promise<Object>} 查询结果
 */
const getWebAccessList = async (query) => {
  try {
    let { page = 1, pageSize = 10, userName = '' } = query;
    // 转换为数字
    page = Number(page);
    pageSize = Number(pageSize);
    const offset = (page - 1) * pageSize;

    // 构建查询条件
    const whereCondition = {};
    if (userName) {
      whereCondition.userName = { [Op.like]: `%${userName}%` };
    }

    // 查询数据
    const { count, rows } = await WebAccess.findAndCountAll({
      where: whereCondition,
      order: [['requestTime', 'DESC']],
      limit: pageSize,
      offset
    });

    return {
      total: count,
      currentPage: page,
      pageSize,
      data: rows
    };
  } catch (error) {
    throw error;
  }
};

/**
/**
 * 清空所有网站访问记录
 * @returns {Promise<number>} 删除的记录数
 */
const deleteWebAccess = async () => {
  try {
    const result = await WebAccess.destroy({
      where: {}
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createWebAccess,
  getWebAccessList,
  deleteWebAccess
};