const { Caicai, Sequelize } = require("../models");
/**
 * 检查并添加默认数据
 */
const checkAndAddDefaultData = async () => {
  try {
    // 查询是否存在数据
    const count = await Caicai.count();
    if (count === 0) {
      // 创建默认数据
      const defaultData = {
        name: "彩彩论坛",
        // 其他字段使用默认值或空值
      };
      const createdData = await Caicai.create(defaultData);
      return { success: true, message: "添加默认数据成功", data: createdData };
    }
    return { success: true, message: "已存在数据，无需添加", data: null };
  } catch (error) {
    return {
      success: false,
      message: "检查并添加默认数据失败",
      error: error.message,
    };
  }
};

/**
 * 查询默认第一条数据
 */
const getDefaultCaicai = async () => {
  try {
    // 先检查是否有默认数据，如果没有则添加
    await checkAndAddDefaultData();
    // 查询第一条数据
    const caicai = await Caicai.findOne({
      order: [["createdAt", "ASC"]],
    });
    return { success: true, message: "查询成功", data: caicai };
  } catch (error) {
    return { success: false, message: "查询失败", error: error.message };
  }
};

/**
 * 修改数据
 */
const updateCaicai = async (id, data) => {
  try {
    const caicai = await Caicai.findByPk(id);
    if (!caicai) {
      return { success: false, message: "未找到数据", error: "数据不存在" };
    }
    await caicai.update(data);
    return { success: true, message: "修改成功", data: caicai };
  } catch (error) {
    return { success: false, message: "修改失败", error: error.message };
  }
};

module.exports = {
  checkAndAddDefaultData,
  getDefaultCaicai,
  updateCaicai,
};
