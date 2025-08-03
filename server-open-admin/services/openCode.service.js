const { Op } = require('sequelize');
const db = require('../models');
const OpenCode = db.OpenCode;

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
      pages: Math.ceil(count / pageSize),
      currentPage: page,
      pageSize: pageSize,
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


// 获取开奖数据 
// 新澳门
async function getOpenDataNewMacaoYear() {
  try {
    const result = await OpenCode.findAll({
      where: {
        openTime: {
          [Op.gte]: new Date('2023-01-01')
        }
      }
    });
    return result;
  } catch (error) {
    throw new Error(`查询开奖数据失败: ${error.message}`);
  }
}

// 获取开奖数据 
// 澳门
async function getOpenDataMacaoYear() {
  try {
    const result = await OpenCode.findAll({
      where: {
        openTime: {
          [Op.gte]: new Date('2023-01-01')
        }
      }
    });
    return result;
  } catch (error) {
    throw new Error(`查询开奖数据失败: ${error.message}`);
  }
}

// 获取开奖数据 
// 香港
async function getOpenDataHongKongYear() {
  try {
    const result = await OpenCode.findAll({
      where: {
        openTime: {
          [Op.gte]: new Date('2023-01-01')
        }
      }
    });
    return result;
  } catch (error) {
    throw new Error(`查询开奖数据失败: ${error.message}`);
  }
}

module.exports = {
  createOpenCode,
  getOpenCodesByDate,
  updateOpenCode,
  deleteOpenCode,
  getAllOpenCodes
};
