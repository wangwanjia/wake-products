const { WebView } = require('../models');
const { Op } = require('sequelize');

// 新增访问记录
exports.createView = async (viewData) => {
  try {
    const view = await WebView.create(viewData);
    return { success: true, message: '访问记录新增成功' };
  } catch (error) {
    throw new Error(`新增访问记录失败: ${error.message}`);
  }
};

// 获取所有访问记录（分页）
exports.getAllViews = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await WebView.findAndCountAll({
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'DESC']]
    });
    return {
      success: true,
      total: count,
      page: page,
      pageSize: pageSize,
      data: rows
    };
  } catch (error) {
    throw new Error(`获取访问记录失败: ${error.message}`);
  }
};

// 批量删除访问记录
exports.deleteViews = async (viewIds) => {
  try {
    await WebView.destroy({
      where: {
        id: viewIds
      }
    });
    return { success: true, message: '访问记录删除成功' };
  } catch (error) {
    throw new Error(`删除访问记录失败: ${error.message}`);
  }
};

// 根据用户名搜索访问记录
exports.searchViewsByUserName = async (userName, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await WebView.findAndCountAll({
      where: {
        userName: {
          [Op.like]: `%${userName}%`
        }
      },
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'DESC']]
    });
    return {
      success: true,
      total: count,
      page: page,
      pageSize: pageSize,
      data: rows
    };
  } catch (error) {
    throw new Error(`搜索访问记录失败: ${error.message}`);
  }
};

// 清空访问记录表
exports.clearViews = async () => {
  try {
    await WebView.destroy({
      where: {}
    });
    return { success: true, message: '访问记录表已清空' };
  } catch (error) {
    throw new Error(`清空访问记录表失败: ${error.message}`);
  }
};

// 获取访问地区统计数据（用于图表展示）
exports.getViewLocationStats = async () => {
  try {
    // 获取所有访问记录
    const views = await WebView.findAll();

    // 统计各地区访问量
    const locationStats = {};
    views.forEach(view => {
        
    const locationStr = view.dataValues.location || '未知,未知,未知';
    const [country, province, city] = locationStr.split(',');
      const locationKey = `${province}-${city}`;

      
      if (locationStats[locationKey]) {
        locationStats[locationKey]++;
      } else {
        locationStats[locationKey] = 1;
      }
    });
    
    // 转换为x轴和y轴数据
    const xAxis = Object.keys(locationStats);
    const yAxis = Object.values(locationStats);
    
    return {
      success: true,
      data: {
        xAxis,
        yAxis
      }
    };
  } catch (error) {
    throw new Error(`获取访问地区统计失败: ${error.message}`);
  }
};

// 获取一个月内访问数据统计（用于图表展示）
exports.getMonthlyViewStats = async () => {
  try {
    // 计算一个月前的日期
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    // 获取一个月内的所有访问记录
    const views = await WebView.findAll({
      where: {
        createdAt: {
          [Op.gte]: oneMonthAgo
        }
      },
      order: [['createdAt', 'ASC']]
    });
    
    // 按日期统计访问量
    const dailyStats = {};
    views.forEach(view => {
      const date = new Date(view.createdAt);
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      if (dailyStats[dateKey]) {
        dailyStats[dateKey]++;
      } else {
        dailyStats[dateKey] = 1;
      }
    });
    
    // 生成一个月内的所有日期
    const dateArray = [];
    const currentDate = new Date(oneMonthAgo);
    while (currentDate <= new Date()) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      dateArray.push(dateKey);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // 转换为x轴和y轴数据，确保每个日期都有数据（包括0）
    const xAxis = dateArray;
    const yAxis = dateArray.map(date => dailyStats[date] || 0);
    
    return {
      success: true,
      data: {
        xAxis,
        yAxis
      }
    };
  } catch (error) {
    throw new Error(`获取月度访问统计失败: ${error.message}`);
  }
};

// 获取24小时内访问数据统计（用于图表展示）
exports.get24HoursViewStats = async () => {
  try {
    // 计算24小时前的时间
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    // 获取24小时内的所有访问记录
    const views = await WebView.findAll({
      where: {
        createdAt: {
          [Op.gte]: twentyFourHoursAgo
        }
      },
      order: [[ 'createdAt', 'ASC' ]]
    });
    
    // 按小时统计访问量
    const hourlyStats = {};
    views.forEach(view => {
      const date = new Date(view.createdAt);
      const hourKey = `${String(date.getHours()).padStart(2, '0')}:00`;
      
      if (hourlyStats[hourKey]) {
        hourlyStats[hourKey]++;
      } else {
        hourlyStats[hourKey] = 1;
      }
    });
    
    // 生成24小时的所有小时
    const hourArray = [];
    for (let i = 0; i < 24; i++) {
      const hourKey = `${String(i).padStart(2, '0')}:00`;
      hourArray.push(hourKey);
    }
    
    // 转换为x轴和y轴数据，确保每个小时都有数据（包括0）
    const xAxis = hourArray;
    const yAxis = hourArray.map(hour => hourlyStats[hour] || 0);
    
    return {
      success: true,
      data: {
        xAxis,
        yAxis
      }
    };
  } catch (error) {
    throw new Error(`获取24小时访问统计失败: ${error.message}`);
  }
};

// 获取设备类型统计数据（PC、移动、平板）
exports.getDeviceTypeStats = async () => {
  try {
    // 获取所有访问记录
    const views = await WebView.findAll();
    
    // 初始化设备类型统计
    const deviceStats = {
      desktop: 0,
      mobile: 0,
      tablet: 0
    };
    
    // 统计各设备类型的访问量
    views.forEach(view => {
      const deviceType = view.dataValues.deviceViews || '';
      // 根据设备类型字符串判断并计数
      if (deviceType.toLowerCase().includes('pc') || deviceType.toLowerCase().includes('desktop')) {
        deviceStats.desktop++;
      } else if (deviceType.toLowerCase().includes('mobile') || deviceType.toLowerCase().includes('phone')) {
        deviceStats.mobile++;
      } else if (deviceType.toLowerCase().includes('tablet')) {
        deviceStats.tablet++;
      }
    });
    
    return {
      success: true,
      data: deviceStats
    };
  } catch (error) {
    throw new Error(`获取设备类型统计失败: ${error.message}`);
  }
};