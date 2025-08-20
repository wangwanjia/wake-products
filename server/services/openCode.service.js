const { Op } = require('sequelize');
const db = require('../models');
const OpenCode = db.OpenCode;
const axios = require("axios");
const { codeArr } = require("../utils/result")


// 通过openType获取响应的url
function getUrlByOpenType(openType, year) {
  switch (openType) {
    case "newMacao":
      // API_NEWMACAO_URL调用.env
      return process.env.API_NEWMACAO_URL + year;
    case "macao":
      // API_MACAO_URL调用.env
      return process.env.API_MACAO_URL + year;
    case "hongKong":
      // API_HONGKONG_URL调用.env
      return process.env.API_HONGKONG_URL;
    default:
      throw new Error("无效的openType类型: " + openType);
  }
}

// 创建开奖记录
async function createOpenCode(data) {
  try {
    return await OpenCode.create(data);
  } catch (error) {
    throw new Error(`创建开奖记录失败: ${error.message}`);
  }
}

// 按日期范围查询开奖记录
async function getOpenCodesByDate(startDate, endDate, page = 1, pageSize = 10) {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await OpenCode.findAndCountAll({
      where: {
        openTime: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        },
      },
      order: [['openTime', 'DESC']],
      limit: pageSize,
      offset: offset
    });

    return {
      total: count,
      data: rows
    };
  } catch (error) {
    throw new Error(`查询开奖记录失败: ${error.message}`);
  }
}

// 更新开奖记录
async function updateOpenCode(id, data) {
    console.log('data', data);
    
  // 检查传入的data是否为对象类型
  const openCode = await OpenCode.findByPk(id);
  if (!openCode) throw new Error('记录不存在');
  
  // 过滤掉不存在的字段，避免无效更新
  const validFields = Object.keys(OpenCode.rawAttributes)
    .filter(field => data.hasOwnProperty(field));
  
  const updateData = validFields.reduce((acc, field) => {
    acc[field] = data[field];
    return acc;
  }, {});
  
  if (Object.keys(updateData).length === 0) {
    throw new Error('没有有效的更新字段');
  }
  
  try {
    return await openCode.update(updateData);
  } catch (error) {
    throw new Error(`更新开奖记录失败: ${error.message}`);
  }
}

// 获取全部开奖记录（分页）
async function getAllOpenCodes(page = 1, pageSize = 10) {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await OpenCode.findAndCountAll({
      order: [['openTime', 'DESC']],
      limit: pageSize,
      offset: offset
    });
    return {
      total: count,
      pages: Math.ceil(count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: rows
    };
  } catch (error) {
    throw new Error(`查询全部开奖记录失败: ${error.message}`);
  }
}

// 清空所有开奖记录
async function clearAllOpenCodes() {
  try {
    await OpenCode.destroy({
      where: {}
    });
    return { message: '成功清空所有开奖记录' };
  } catch (error) {
    throw new Error(`清空开奖记录失败: ${error.message}`);
  }
}

// 删除开奖记录（支持单个和批量删除）
async function deleteOpenCode(ids) {
  try {
    // 确保ids是数组
    const idArray = Array.isArray(ids) ? ids : [ids];
    
    // 验证所有记录是否存在
    const existingRecords = await OpenCode.findAll({
      where: {
        id: {
          [Op.in]: idArray
        }
      }
    });
    
    if (existingRecords.length !== idArray.length) {
      const existingIds = existingRecords.map(record => record.id);
      const nonExistingIds = idArray.filter(id => !existingIds.includes(id));
      throw new Error(`记录不存在: ${nonExistingIds.join(', ')}`);
    }
    
    // 执行删除
    await OpenCode.destroy({
      where: {
        id: {
          [Op.in]: idArray
        }
      }
    });
    
    return { message: `成功删除 ${idArray.length} 条开奖记录` };
  } catch (error) {
    throw new Error(`删除开奖记录失败: ${error.message}`);
  }
}


// 获取开奖数据（按年份）
async function getOpenDataYear(openType) {
  try {
    let p = `?openType=${openType}&pageSize=100000`
    let url = process.env.API_OPEN_URL + p;

    const response = await axios.get(url);
    let data = response.data.data;
    let newData = [];
    if (data.length > 0) {
      // 批量创建实例并获取创建成功的数量，添加验证错误处理
      newData = data.map(item => {
        return {
          expect: item.expect,
          openTime: item.openTime,
          openCode: item.openCode,
          wave: item.wave,
          zodiac: item.zodiac,
        }
      })
      try {
        const createdCount = await OpenCode.bulkCreate(newData, { validate: true });
        return { message: `成功添加 ${createdCount.length} 条数据`, total: createdCount.length };
      } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          console.error('批量创建时验证失败:', error.errors.map(e => e.message));
        }
        throw new Error(`查询开奖数据失败: ${error.message}`);
      }
    } else {
      return { message: '没有有效的数据可以添加', total: 0 };
    }
  } catch (error) {
    throw new Error(`查询开奖数据失败: ${error.message}`);
  }
}

// 获取开奖数据（最新一期）
async function getOpenDataNew(openType) {
  try {
    // 判断当前日期是否存在
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split('T')[0];
    const existingRecord = await OpenCode.findOne({
      where: {
        openTime: currentDateStr
      }
    });
    if (existingRecord) {
      return { message: '当前日期数据已存在', total: 0 };
    }

    // 获取数据
    let p = `?openType=${openType}&pageSize=1`
    let url = process.env.API_OPEN_URL + p;
    const response = await axios.get(url);
    let data = response.data.data;
    console.log(data);
    
    // 遍历数据，转换为模型实例
    let instances = {};
    if (data.length > 0) {
      instances.expect = data[0].expect;
      instances.openTime = data[0].openTime;
      instances.openCode = data[0].openCode;
      instances.wave = data[0].wave;
      instances.zodiac = data[0].zodiac;
    } else {
      throw new Error(`查询开奖数据失败: 接口返回数据为空`);
    }
    // 批量创建实例并获取创建成功的数量
    const createdCount = await OpenCode.bulkCreate([instances]).then(
      (instances) => instances.length
    );
    return { message: `成功添加 ${createdCount} 条数据`, total: createdCount };
  } catch (error) {
    throw new Error(`查询开奖数据失败: ${error.message}`);
  }
}


module.exports = {
  createOpenCode,
  getOpenCodesByDate,
  updateOpenCode,
  deleteOpenCode,
  getAllOpenCodes,
  clearAllOpenCodes,
  getOpenDataYear,
  getOpenDataNew,
};
