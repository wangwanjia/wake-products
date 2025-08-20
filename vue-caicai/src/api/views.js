import request from '@/utils/request'

/**
 * 新增访问记录
 * @param {Object} data - 访问记录数据
 * @returns {Promise}
 */
export function createView(data) {
  return request({
    url: '/views',
    method: 'post',
    data
  })
}

/**
 * 获取所有访问记录（分页）
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页条数
 * @returns {Promise}
 */
export function getAllViews(params) {
  return request({
    url: '/views',
    method: 'get',
    params
  })
}

/**
 * 批量删除访问记录
 * @param {Object} data - 删除数据
 * @param {Array} data.viewIds - 访问记录ID数组
 * @returns {Promise}
 */
export function deleteViews(viewIds) {
  return request({
    url: '/views',
    method: 'delete',
    data: {
      viewIds
    }

  })
}

/**
 * 根据用户名搜索访问记录
 * @param {Object} params - 查询参数
 * @param {string} params.userName - 用户名
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页条数
 * @returns {Promise}
 */
export function searchViewsByUserName(params) {
  return request({
    url: '/views/search',
    method: 'get',
    params
  })
}

/**
 * 清空访问记录表
 * @returns {Promise}
 */
export function clearViews() {
  return request({
    url: '/views/clear',
    method: 'delete'
  })
}

/**
 * 获取访问地区统计数据（用于图表展示）
 * @returns {Promise}
 */
export function getViewLocationStats() {
  return request({
    url: '/views/stats/location',
    method: 'get'
  })
}

/**
 * 获取一个月内访问数据统计（用于图表展示）
 * @returns {Promise}
 */
export function getMonthlyViewStats() {
  return request({
    url: '/views/stats/monthly',
    method: 'get'
  })
}

/**
 * 获取24小时内访问数据统计（用于图表展示）
 * @returns {Promise}
 */
export function get24HoursViewStats() {
  return request({
    url: '/views/stats/24hours',
    method: 'get'
  })
}

/**
 * 获取设备类型统计数据（PC、移动、平板）
 * @returns {Promise}
 */
export function getDeviceTypeStats() {
  return request({
    url: '/views/stats/device',
    method: 'get'
  })
} 