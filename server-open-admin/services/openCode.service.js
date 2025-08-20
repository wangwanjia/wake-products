const { Op } = require("sequelize");
const db = require("../models");
const axios = require("axios");
const { formatDate } = require("../utils/index");
const { sxArr, codeArr, getCodeObjByNumbers } = require("../utils/result");

// 根据openType获取对应的模型
function getModelByOpenType(openType) {
  switch (openType) {
    case "newMacao":
      return db.OpenCodeNewMacao;
    case "macao":
      return db.OpenCodeMacao;
    case "hongKong":
      return db.OpenCodeHongKong;
    default:
      throw new Error("无效的openType类型: " + openType);
  }
}
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
// 获取最新一期数据
function getUrlByOpenTypeNew(openType) {
  switch (openType) {
    case "newMacao":
      // API_NEWMACAO_URL调用.env
      return process.env.API_NEWMACAO_NEW_URL;
    case "macao":
      // API_MACAO_URL调用.env
      return process.env.API_MACAO_NEW_URL;
    case "hongKong":
      // API_HONGKONG_URL调用.env
      return process.env.API_HONGKONG_NEW_URL;
    default:
      throw new Error("无效的openType类型: " + openType);
  }
}

// 创建开奖记录
async function createOpenCode(openType, data) {
  try {
    const Model = getModelByOpenType(openType);
    return await Model.create(data);
  } catch (error) {
    throw new Error(`创建开奖记录失败: ${error.message}`);
  }
}

// 按日期范围查询开奖记录
async function getOpenCodesByDate(
  openType,
  startDate,
  endDate,
  page = 1,
  pageSize = 10
) {
  try {
    const Model = getModelByOpenType(openType);
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Model.findAndCountAll({
      where: {
        openTime: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      order: [["openTime", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    return {
      total: count,
      pages: Math.ceil(count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: rows,
    };
  } catch (error) {
    throw new Error(`查询开奖记录失败: ${error.message}`);
  }
}

// 更新开奖记录
async function updateOpenCode(openType, id, data) {
  try {
    const Model = getModelByOpenType(openType);
    // 检查记录是否存在
    const openCode = await Model.findByPk(id);
    if (!openCode) throw new Error("记录不存在");

    // 过滤掉不存在的字段，避免无效更新
    const validFields = Object.keys(Model.rawAttributes).filter((field) =>
      data.hasOwnProperty(field)
    );

    const updateData = validFields.reduce((acc, field) => {
      acc[field] = data[field];
      return acc;
    }, {});

    if (Object.keys(updateData).length === 0) {
      throw new Error("没有有效的更新字段");
    }

    return await openCode.update(updateData);
  } catch (error) {
    throw new Error(`更新开奖记录失败: ${error.message}`);
  }
}

// 获取全部开奖记录（分页）
async function getAllOpenCodes(openType, page = 1, pageSize = 10) {
  try {
    const Model = getModelByOpenType(openType);
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Model.findAndCountAll({
      order: [["openTime", "DESC"]],
      limit: pageSize,
      offset: offset,
    });
    return {
      total: count,
      currentPage: page,
      data: rows,
    };
  } catch (error) {
    throw new Error(`查询全部开奖记录失败: ${error.message}`);
  }
}

// 删除开奖记录（支持单个和批量删除）
async function deleteOpenCode(openType, ids) {
  try {
    const Model = getModelByOpenType(openType);
    // 确保ids是数组
    const idArray = Array.isArray(ids) ? ids : [ids];

    // 验证所有记录是否存在
    const existingRecords = await Model.findAll({
      where: {
        id: {
          [Op.in]: idArray,
        },
      },
    });

    if (existingRecords.length !== idArray.length) {
      const existingIds = existingRecords.map((record) => record.id);
      const nonExistingIds = idArray.filter((id) => !existingIds.includes(id));
      throw new Error(`记录不存在: ${nonExistingIds.join(", ")}`);
    }

    // 执行删除
    await Model.destroy({
      where: {
        id: {
          [Op.in]: idArray,
        },
      },
    });

    return { message: `成功删除 ${idArray.length} 条开奖记录` };
  } catch (error) {
    throw new Error(`删除开奖记录失败: ${error.message}`);
  }
}

// 清空所有开奖记录
async function clearAllOpenCodes(openType) {
  try {
    const Model = getModelByOpenType(openType);
    await Model.destroy({
      where: {},
    });
    return { message: "成功清空所有开奖记录" };
  } catch (error) {
    throw new Error(`清空开奖记录失败: ${error.message}`);
  }
}

// 获取开奖数据（按年份）
async function getOpenDataYear(openType, year = new Date().getFullYear()) {
  try {
    const Model = getModelByOpenType(openType);
    // 得到近三年的年份
    let years = [];
    for (let i = 0; i < 3; i++) {
      years.push(year - i);
    }
    // 遍历年份，获取数据
    let allData = [];   //原始数据
    let instances = [];  //处理后数据
    if (openType == "hongKong") {
      // 香港接口没有年份参数，直接获取最新数据
      const url = getUrlByOpenType(openType);
      const response = await axios.get(url);
      allData = allData.concat(response.data.data);
      // 处理数据
      for (let item of allData) {
        let modelData = {
          expect: String(item.issue).slice(4),
          openTime: item.gameDay,
          openCode: item.num.map(num => num.toString().padStart(2, '0')),
          wave: [],
          zodiac: item.zodiac,
        };
        // 日期格式化
        let date = String(item.gameDay);
        let formatted = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)} 21:30:00`;
        modelData.openTime = formatted;
        modelData.openCode.forEach((code) => { 
          let codeObj = codeArr[Number(code) - 1];
          modelData.wave.push(codeObj.bose);  //波色
        });
        // 检查当前处理的数据openTime是否已存在于instances中
        if (!instances.some(item => item.openTime === modelData.openTime)) {
          instances.push(modelData);
        }
      }
    } else {
      // 其他接口需要年份参数
      for (let y of years) {
        const url = getUrlByOpenType(openType, y);
        const response = await axios.get(url);
        allData = allData.concat(response.data.data);
      }
      // 处理数据
      for (let item of allData) {
        try {
          // 检查必要字段是否存在
          if (!item.expect || !item.openTime || !item.openCode) {
            console.warn('数据缺失必要字段，跳过该条记录:', item);
            continue;
          }

          let modelData = {
            expect: item.expect.slice(4),
            openTime: item.openTime,
            openCode: item.openCode.split(",").map((code) => code.trim()),
            wave: [],
            zodiac: [],
          };

          modelData.openCode.forEach((code) => {
            // 检查 code 是否为有效数字
            const numCode = Number(code);
            if (isNaN(numCode) || numCode < 1 || numCode > codeArr.length) {
              throw new Error(`无效的开奖号码: ${code}`);
            }
            let codeObj = codeArr[numCode - 1];
            modelData.wave.push(codeObj.bose);
            modelData.zodiac.push(codeObj.sx);
          });

          if (!instances.some(item => item.openTime === modelData.openTime)) {
            instances.push(modelData);
          }
        } catch (error) {
          console.warn('处理数据时出错，跳过该条记录:', error.message, item);
        }
      }
    }
    if (instances.length > 0) {
      // 批量创建实例并获取创建成功的数量，添加验证错误处理
      try {
        const createdCount = await Model.bulkCreate(instances, { validate: true });
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
    const Model = getModelByOpenType(openType);
    // 检查是否存在最新一期数据
    // 获取当天的日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 查找当天是否存在记录
    const todayRecord = await Model.findOne({
      where: {
        openTime: {
          [Op.gte]: today,
          [Op.lt]: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });
    if (todayRecord) {
      return { message: "当天的开奖数据已存在", expect: todayRecord.expect };
    }
    // 遍历年份，获取数据
    let allData = {};
    if (openType == "hongKong") {
      //香港
      const url = getUrlByOpenTypeNew(openType);
      const response = await axios.get(url);
      allData = allData.concat(response.data);
    } else {
      //新澳门和澳门
      const url = getUrlByOpenTypeNew(openType);
      const response = await axios.get(url);
      let data = response.data;
      if (data.length > 0) {
        allData = {
          expect: data[0].expect.slice(4),
          openTime: data[0].openTime,
          openCode: data[0].openCode.split(",").map((code) => code.trim()),
          wave: data[0].wave.split(",").map((code) => code.trim()),
          zodiac: data[0].zodiac.split(",").map((code) => code.trim()),
        };
      } else {
        throw new Error(`查询开奖数据失败: 接口返回数据为空`);
      }
    }

    // 遍历数据，转换为模型实例
    let instances = [allData];
    // 批量创建实例并获取创建成功的数量
    const createdCount = await Model.bulkCreate(instances).then(
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
