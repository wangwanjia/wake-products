const { Order, Sequelize } = require('../models');
const { Op } = Sequelize;

// 创建订单
exports.createOrder = async (orderData) => {
  try {
    const order = await Order.create(orderData);
    return { success: true, data: order };
  } catch (error) {
    throw new Error(`创建订单失败: ${error.message}`);
  }
};

// 获取所有订单（分页）
exports.getAllOrders = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Order.findAndCountAll({
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
    throw new Error(`获取订单失败: ${error.message}`);
  }
};

// 批量删除订单
exports.deleteOrders = async (orderIds) => {
  try {
    await Order.destroy({
      where: {
        id: orderIds
      }
    });
    return { success: true, message: '订单删除成功' };
  } catch (error) {
    throw new Error(`删除订单失败: ${error.message}`);
  }
};

// 根据用户名搜索订单
exports.searchOrdersByUserName = async (userName, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Order.findAndCountAll({
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
    throw new Error(`搜索订单失败: ${error.message}`);
  }
};

// 清空订单表
exports.clearOrders = async () => {
  try {
    await Order.destroy({
      where: {}
    });
    return { success: true, message: '订单表已清空' };
  } catch (error) {
    throw new Error(`清空订单表失败: ${error.message}`);
  }
};

// 获取订单统计信息（总数和总金额）
exports.getOrderStats = async () => {
  try {
    const result = await Order.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalOrders'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
      ]
    });
    
    const stats = result[0].dataValues;
    return {
      success: true,
      data: {
        totalOrders: stats.totalOrders || 0,
        totalAmount: stats.totalAmount || 0
      }
    };
  } catch (error) {
    throw new Error(`获取订单统计信息失败: ${error.message}`);
  }
};