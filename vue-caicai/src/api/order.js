import request from '@/utils/request';
// 创建订单
export function createOrder(data) {
  return request({
    url: '/order',
    method: 'post',
    data
  });
}

// 获取所有订单（分页）
export function getAllOrders(params) {
  return request({
    url: '/order',
    method: 'get',
    params
  });
}

// 批量删除订单
export function deleteOrders(orderIds) {
  return request({
    url: '/order',
    method: 'delete',
    data: {
      orderIds
    }
  });
}

// 根据用户名搜索订单
export function searchOrdersByUserName(username, params = {}) {
  return request({
    url: '/order/search',
    method: 'get',
    params: {
      userName: username,
      ...params
    }
  });
}

// 清空订单表
export function clearOrders() {
  return request({
    url: '/order/clear',
    method: 'delete'
  });
}

// 获取订单统计信息
export function getOrderStats() {
  return request({
    url: '/order/stats',
    method: 'get'
  });
}

